import type {
  DragState,
  NodeDragEventData,
  NodeRecord,
  ParentEventData,
  PointeroverParentEvent,
  ParentRecord,
  SynthDragState,
  InsertEvent,
  BaseDragState,
  InsertConfig,
  Coordinates,
  InsertState,
  Node,
  DragStateProps,
} from "@formkit/drag-and-drop";

import { formSchema } from "./default-form-elements.ts";

import {
  parents,
  parentValues,
  setParentValues,
  state,
  addParentClass,
  isDragState,
  isSynthDragState,
  removeClass,
  addEvents,
  nodes,
} from "@formkit/drag-and-drop";

import { eq, pd, eventCoordinates } from "./utils";
import type { FormKitSchemaFormKit } from "@formkit/core";
import { watch } from "vue";

export const insertState: InsertState<unknown> = {
  draggedOverNodes: [],
  draggedOverParent: null,
  targetIndex: 0,
  ascending: false,
  insertPoint: null,
  dragging: false,
};

let documentController: AbortController | undefined;

/**
 * Safari does not like the fast updates moveBetween() tries to do, so this
 * delay will throttle the number of calls it is allowed in milliseconds
 */
const throttle = (fn: Function) => {
  const delay = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? 100 : 0;
  let timerFlag: number | null = null; // Variable to keep track of the timer
  // Returning a throttled version
  return (...args: any[]) => {
    if (timerFlag === null) {
      fn(...args);
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
}

export function customInsertPlugin<T>(insertConfig: InsertConfig<T>) {
  return (parent: HTMLElement) => {
    const parentData = parents.get(parent);

    if (!parentData) return;

    const insertParentConfig = {
      ...parentData.config,
      insertConfig,
    };

    return {
      setup() {
        insertParentConfig.handleNodeDragover =
          insertConfig.handleNodeDragover || handleNodeDragover;

        insertParentConfig.handleParentPointerover =
          insertConfig.handleParentPointerover || handleParentPointerover;

        insertParentConfig.handleNodePointerover =
          insertConfig.handleNodePointerover || handleParentPointerover;

        insertParentConfig.handleParentDragover =
          insertConfig.handleParentDragover || handleParentDragover;

        const originalHandleEnd = insertParentConfig.handleEnd;

        insertParentConfig.handleEnd = (
          state: DragState<T> | SynthDragState<T>,
        ) => {
          handleEnd(state);

          originalHandleEnd(state);
        };

        parentData.on("dragStarted", () => {
          documentController = addEvents(document, {
            dragover: throttle(checkPosition),
            pointermove: throttle(checkPosition),
          });
        });

        parentData.on("dragEnded", () => {
          documentController?.abort();
        });

        parentData.config = insertParentConfig;

        state.on("dragStarted", () => {
          defineRanges(parent);
        });

        watch(
          formSchema,
          (newSchema) => {
            if (newSchema) {
              setParentValues(parent, parentData, [...newSchema]);
            }
          },
          { deep: true },
        );

        state.on("scrollStarted", () => {
          if (insertState.insertPoint)
            insertState.insertPoint.el.style.display = "none";
        });

        state.on("scrollEnded", () => {
          defineRanges(parent);
        });

        state.on("dragEnded", () => {
          if (
            insertState.draggedOverParent &&
            insertState.draggedOverParent.data.getValues(
              insertState.draggedOverParent.el,
            ).length === 0
          ) {
            insertParentConfig.handleEnd(state as any);
          }
        });

        const firstScrollableParent = findFirstOverflowingParent(parent);

        if (firstScrollableParent) {
          firstScrollableParent.addEventListener(
            "scroll",
            defineRanges.bind(null, parent),
          );
        }

        window.addEventListener("resize", defineRanges.bind(null, parent));
      },
    };
  };
}

function findFirstOverflowingParent(element: HTMLElement): HTMLElement | null {
  let parent = element.parentElement;

  while (parent) {
    const { overflow, overflowY, overflowX } = getComputedStyle(parent);

    // Check if the overflow property is set to scroll, auto, or hidden (anything other than visible)
    const isOverflowSet =
      overflow !== "visible" ||
      overflowY !== "visible" ||
      overflowX !== "visible";

    // Check if there is actual overflow (scrolling)
    const isOverflowing =
      parent.scrollHeight > parent.clientHeight ||
      parent.scrollWidth > parent.clientWidth;
    const hasScrollPosition = parent.scrollTop > 0 || parent.scrollLeft > 0;

    if (isOverflowSet && (isOverflowing || hasScrollPosition)) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return null; // No overflowing parent found
}

function checkPosition(e: DragEvent | PointerEvent) {
  if (!isDragState(state)) return;

  const el = document.elementFromPoint(e.clientX, e.clientY);

  // 1. If the element is not an HTMLElement or is the customInsertPlugin point itself, do nothing.
  if (!(el instanceof HTMLElement) || el === insertState.insertPoint?.el) {
    if (insertState.insertPoint) {
      insertState.insertPoint.el.style.display = "none";
    }
    return;
  }

  // 2. Traverse up the DOM from the element under the cursor
  //    to see if any ancestor is a registered parent.
  let isWithinAParent = false;
  let current: HTMLElement | null = el;
  while (current) {
    if (nodes.has(current as Node) || parents.has(current)) {
      isWithinAParent = true;
      break; // Found a registered parent ancestor
    }
    if (current === document.body) break; // Stop if we reach the body
    current = current.parentElement;
  }

  // 3. If the cursor is NOT within any registered parent...
  if (!isWithinAParent) {
    // Hide the customInsertPlugin point if it exists
    if (insertState.insertPoint) {
      insertState.insertPoint.el.style.display = "none";
    }

    // Remove the drop zone class if a parent was previously being dragged over
    if (insertState.draggedOverParent) {
      removeClass(
        [insertState.draggedOverParent.el],
        insertState.draggedOverParent.data.config.dropZoneClass,
      );
    }

    // Reset customInsertPlugin state related to dragged over elements
    insertState.draggedOverNodes = [];
    insertState.draggedOverParent = null;

    // Reset current parent in the main state back to the initial one
    state.currentParent = state.initialParent;
  }
  // 4. If the cursor IS within a registered parent, do nothing in this function.
  // Other event handlers will manage the insertion point positioning.
}

interface Range {
  x: [number, number];
  y: [number, number];
  vertical: boolean;
}

function createVerticalRange(
  nodeCoords: Coordinates,
  otherCoords: Coordinates | undefined,
  isAscending: boolean,
): Range {
  const center = nodeCoords.top + nodeCoords.height / 2;

  if (!otherCoords) {
    const offset = nodeCoords.height / 2 + 10;
    return {
      y: isAscending ? [center, center + offset] : [center - offset, center],
      x: [nodeCoords.left, nodeCoords.right],
      vertical: true,
    };
  }

  const otherEdge = isAscending ? otherCoords.top : otherCoords.bottom;
  const nodeEdge = isAscending ? nodeCoords.bottom : nodeCoords.top;

  let midpoint: number;
  let range: [number, number];

  if (isAscending) {
    // Midpoint between current node's bottom and the next node's top
    midpoint = nodeEdge + (otherEdge - nodeEdge) / 2; // nodeCoords.bottom + (otherCoords.top - nodeCoords.bottom) / 2
    range = [center, midpoint]; // Range from the node center down to midpoint
  } else {
    // Midpoint between previous node's bottom and the current node's top
    midpoint = otherEdge + (nodeEdge - otherEdge) / 2; // otherCoords.bottom + (nodeCoords.top - otherCoords.bottom) / 2
    range = [midpoint, center]; // Range from midpoint down to the node center
  }

  return {
    y: range,
    x: [nodeCoords.left, nodeCoords.right],
    vertical: true,
  };
}

function createHorizontalRange(
  nodeCoords: Coordinates,
  otherCoords: Coordinates | undefined,
  isAscending: boolean,
  lastInRow = false,
): Range {
  const center = nodeCoords.left + nodeCoords.width / 2;

  if (!otherCoords) {
    if (isAscending) {
      return {
        x: [center, center + nodeCoords.width - 150],
        y: [nodeCoords.top, nodeCoords.bottom],
        vertical: false,
      };
    } else {
      return {
        x: [nodeCoords.left - 10, center],
        y: [nodeCoords.top, nodeCoords.bottom],
        vertical: false,
      };
    }
  }

  if (isAscending && lastInRow) {
    return {
      x: [center, nodeCoords.right + 10],
      y: [nodeCoords.top, nodeCoords.bottom],
      vertical: false,
    };
  }

  if (isAscending) {
    const nextNodeCenter = otherCoords.left + otherCoords.width / 2;
    return {
      x: [center, center + Math.abs(center - nextNodeCenter) / 2],
      y: [nodeCoords.top, nodeCoords.bottom],
      vertical: false,
    };
  } else {
    return {
      x: [
        otherCoords.right + Math.abs(otherCoords.right - nodeCoords.left) / 2,
        center,
      ],
      y: [nodeCoords.top, nodeCoords.bottom],
      vertical: false,
    };
  }
}

function getRealCoords(el: HTMLElement): Coordinates {
  const { top, bottom, left, right, height, width } =
    el.getBoundingClientRect();

  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  return {
    top: top + scrollTop,
    bottom: bottom + scrollTop,
    left: left + scrollLeft,
    right: right + scrollLeft,
    height,
    width,
  };
}

function defineRanges(parent: HTMLElement) {
  if (!isDragState(state) && !isSynthDragState(state)) return;

  const parentData = parents.get(parent);
  if (!parentData) return;

  const enabledNodes = parentData.enabledNodes;

  enabledNodes.forEach((node, index) => {
    node.data.range = {};

    const prevNode = enabledNodes[index - 1];
    const nextNode = enabledNodes[index + 1];
    const nodeCoords = getRealCoords(node.el);
    const prevNodeCoords = prevNode ? getRealCoords(prevNode.el) : undefined;
    const nextNodeCoords = nextNode ? getRealCoords(nextNode.el) : undefined;

    const aboveOrBelowPrevious =
      prevNodeCoords &&
      (nodeCoords.top > prevNodeCoords.bottom ||
        nodeCoords.bottom < prevNodeCoords.top);

    const aboveOrBelowAfter =
      nextNodeCoords &&
      (nodeCoords.top > nextNodeCoords.bottom ||
        nodeCoords.bottom < nextNodeCoords.top);

    const fullishWidth =
      parent.getBoundingClientRect().width * 0.8 < nodeCoords.width;

    if (fullishWidth) {
      node.data.range.ascending = createVerticalRange(
        nodeCoords,
        nextNodeCoords,
        true,
      );
      node.data.range.descending = createVerticalRange(
        nodeCoords,
        prevNodeCoords,
        false,
      );
    } else if (aboveOrBelowAfter && !aboveOrBelowPrevious) {
      node.data.range.ascending = createHorizontalRange(
        nodeCoords,
        nextNodeCoords,
        true,
        true,
      );
      node.data.range.descending = createHorizontalRange(
        nodeCoords,
        prevNodeCoords,
        false,
      );
    } else if (!aboveOrBelowPrevious && !aboveOrBelowAfter) {
      node.data.range.ascending = createHorizontalRange(
        nodeCoords,
        nextNodeCoords,
        true,
      );
      node.data.range.descending = createHorizontalRange(
        nodeCoords,
        prevNodeCoords,
        false,
      );
    } else if (aboveOrBelowPrevious && !nextNodeCoords) {
      node.data.range.ascending = createHorizontalRange(
        nodeCoords,
        undefined,
        true,
      );
    } else if (aboveOrBelowPrevious && !aboveOrBelowAfter) {
      node.data.range.ascending = createHorizontalRange(
        nodeCoords,
        nextNodeCoords,
        true,
      );
      node.data.range.descending = createHorizontalRange(
        nodeCoords,
        undefined,
        false,
      );
    }
  });
}

export function handleNodeDragover<T>(data: NodeDragEventData<T>) {
  const config = data.targetData.parent.data.config;

  if (!config.nativeDrag) return;

  data.e.preventDefault();
}

const throttledMoveBetween = throttle(moveBetween);

function processParentDragEvent<T>(
  e: DragEvent | PointerEvent,
  targetData: ParentEventData<T>["targetData"],
  state: DragState<T>,
  nativeDrag = false,
) {
  pd(e);

  if (nativeDrag && e instanceof PointerEvent) return;

  const { x, y } = eventCoordinates(e);

  // Calculate global coordinates
  const clientX = x;
  const clientY = y;

  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  state.coordinates.x = clientX + scrollLeft;
  state.coordinates.y = clientY + scrollTop;

  const nestedParent = targetData.parent.data.nestedParent;

  let realTargetParent = targetData.parent;

  if (nestedParent) {
    const rect = nestedParent.el.getBoundingClientRect();

    if (state.coordinates.y > rect.top && state.coordinates.y < rect.bottom)
      realTargetParent = nestedParent;
  }

  if (realTargetParent.el === state.currentParent?.el) {
    throttledMoveBetween(realTargetParent, state);
  } else {
    moveOutside(realTargetParent, state);
  }

  state.currentParent = realTargetParent;
}

export function handleParentDragover<T>(
  data: ParentEventData<T>,
  state: DragState<T>,
) {
  processParentDragEvent(data.e as DragEvent, data.targetData, state, true);
}

export function handleParentPointerover<T>(data: PointeroverParentEvent<T>) {
  const { detail } = data;

  const { state, targetData } = detail;

  if (state.scrolling) return;

  processParentDragEvent(detail.e, targetData, state);
}

function handleInsertBasedOnRange<T>(
  foundRange: [NodeRecord<any>, string] | null,
  data: ParentRecord<T>,
) {
  if (!foundRange) {
    return;
  }

  const key = foundRange[1] as "ascending" | "descending";

  if (foundRange) {
    const position = foundRange[0].data.range
      ? foundRange[0].data.range[key]
      : undefined;

    if (position) {
      positionInsertPoint(
        data,
        position,
        foundRange[1] === "ascending",
        foundRange[0],
        insertState as InsertState<T>,
      );
    }
  }
}

export function moveBetween<T>(data: ParentRecord<T>, state: DragState<T>) {
  if (data.data.config.sortable === false) {
    return;
  }

  const values = data.data.getValues(data.el);
  if (values.length === 0) {
    insertState.draggedOverParent = data as ParentRecord<unknown>;

    addParentClass([data.el], data.data.config.dropZoneClass);

    if (!insertState.insertPoint) {
      createInsertPoint(data, insertState as InsertState<T>);
    }

    if (insertState.insertPoint) {
      const rect = data.el.getBoundingClientRect();
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Position in center of empty parent
      Object.assign(insertState.insertPoint.el.style, {
        position: "absolute",
        display: "block",
        top: `${rect.top + rect.height / 2 + scrollTop}px`,
        left: `${rect.left + rect.width / 2 + scrollLeft}px`,
        transform: "translate(-50%, -50%)",
      });
    }

    insertState.targetIndex = 0;
    insertState.ascending = true;

    return;
  }

  if (
    data.el === insertState.draggedOverParent?.el &&
    insertState.draggedOverParent.data.getValues(data.el).length === 0
  ) {
    return;
  } else if (insertState.draggedOverParent?.el) {
    removeClass(
      [insertState.draggedOverParent.el],
      insertState.draggedOverParent.data.config.dropZoneClass,
    );
    insertState.draggedOverParent = null;
  }

  const foundRange = findClosest(data.data.enabledNodes, state);

  handleInsertBasedOnRange(foundRange, data);
}

function moveOutside<T>(data: ParentRecord<T>, state: DragState<T>) {
  if (data.el === state.currentParent.el) return false;

  const targetConfig = data.data.config;

  if (state.draggedNode.el.contains(data.el)) {
    return false;
  }

  if (targetConfig.dropZone === false) {
    return;
  }

  const initialParentConfig = state.initialParent.data.config;

  if (targetConfig.accepts) {
    return targetConfig.accepts(
      data,
      state.initialParent,
      state.currentParent,
      state,
    );
  } else if (
    !targetConfig.group ||
    targetConfig.group !== initialParentConfig.group
  ) {
    return false;
  }

  const values = data.data.getValues(data.el);

  if (!values.length) {
    addParentClass([data.el], targetConfig.dropZoneClass);

    insertState.draggedOverParent = data as ParentRecord<unknown>;

    const insertPoint = insertState.insertPoint;

    if (insertPoint) {
      insertPoint.el.style.display = "none";
    }
  } else {
    removeClass([state.currentParent.el], targetConfig.dropZoneClass);

    const enabledNodes = data.data.enabledNodes;

    const foundRange = findClosest(enabledNodes, state);

    handleInsertBasedOnRange(foundRange, data);
  }
}

let lastFoundRange: [NodeRecord<any>, string] | null = null;
let lastCoordinates = { x: 0, y: 0 };

function findClosest<T>(enabledNodes: NodeRecord<T>[], state: DragState<T>) {
  // Return cached result if coordinates haven't changed significantly
  const deltaX = Math.abs(state.coordinates.x - lastCoordinates.x);
  const deltaY = Math.abs(state.coordinates.y - lastCoordinates.y);
  if (lastFoundRange && deltaX < 5 && deltaY < 5) {
    return lastFoundRange;
  }

  // Search through enabled nodes to find closest match
  let foundRange: [NodeRecord<T>, string] | null = null;

  for (let x = 0; x < enabledNodes.length; x++) {
    if (!state || !enabledNodes[x].data.range) continue;

    const nodeRange = enabledNodes[x].data.range;

    // Check ascending range
    if (nodeRange?.ascending) {
      if (
        state.coordinates.y > nodeRange.ascending.y[0] &&
        state.coordinates.y < nodeRange.ascending.y[1] &&
        state.coordinates.x > nodeRange.ascending.x[0] &&
        state.coordinates.x < nodeRange.ascending.x[1]
      ) {
        foundRange = [enabledNodes[x], "ascending"];
        break;
      }
    }

    // Check descending range
    if (nodeRange?.descending) {
      if (
        state.coordinates.y > nodeRange.descending.y[0] &&
        state.coordinates.y < nodeRange.descending.y[1] &&
        state.coordinates.x > nodeRange.descending.x[0] &&
        state.coordinates.x < nodeRange.descending.x[1]
      ) {
        foundRange = [enabledNodes[x], "descending"];
        break;
      }
    }
  }

  // Hide insert point if moving between different parents
  if (
    insertState.insertPoint &&
    state.initialParent?.el !== state.currentParent?.el
  ) {
    insertState.insertPoint.el.style.display = "none";
  }

  // Update memoization values when result is found
  if (foundRange) {
    lastFoundRange = foundRange;
    lastCoordinates = { ...state.coordinates };
  }

  return foundRange;
}

function createInsertPoint<T>(
  parent: ParentRecord<T>,
  insertState: InsertState<T>,
) {
  const insertPoint = parent.data.config.insertConfig?.insertPoint({
    el: parent.el,
    data: parent.data,
  });

  if (!insertPoint) throw new Error("Insert point not found");

  insertState.insertPoint = {
    parent,
    el: insertPoint,
  };

  document.body.appendChild(insertPoint);

  Object.assign(insertPoint.style, {
    position: "absolute",
    display: "none",
  });
}

function removeInsertPoint<T>(insertState: InsertState<T>) {
  if (insertState.insertPoint?.el) insertState.insertPoint.el.remove();

  insertState.insertPoint = null;
}

function positionInsertPoint<T>(
  parent: ParentRecord<T>,
  position: { x: number[]; y: number[]; vertical: boolean },
  ascending: boolean,
  node: NodeRecord<T>,
  insertState: InsertState<T>,
) {
  if (insertState.insertPoint?.el !== parent.el) {
    removeInsertPoint(insertState);

    createInsertPoint(parent, insertState);
  }

  insertState.draggedOverNodes = [node];

  if (!insertState.insertPoint) return;

  insertState.insertPoint.el.style.display = "block";

  if (position.vertical) {
    const insertPointHeight =
      insertState.insertPoint.el.getBoundingClientRect().height;
    const targetY = position.y[ascending ? 1 : 0];
    const topPosition = targetY - insertPointHeight / 2;

    Object.assign(insertState.insertPoint.el.style, {
      top: `${topPosition}px`,
      left: `${position.x[0]}px`,
      right: `${position.x[1]}px`,
      width: `${position.x[1] - position.x[0]}px`,
    });
  } else {
    const leftPosition =
      position.x[ascending ? 1 : 0] -
      insertState.insertPoint.el.getBoundingClientRect().width / 2;
    insertState.insertPoint.el.style.left = `${leftPosition}px`;

    Object.assign(insertState.insertPoint.el.style, {
      top: `${position.y[0]}px`,
      bottom: `${position.y[1]}px`,
      height: `${position.y[1] - position.y[0]}px`,
    });
  }

  insertState.targetIndex = node.data.index;

  insertState.ascending = ascending;
}

function insertItemsIntoParentFromOutside<T>(
  state: DragStateProps<T> & BaseDragState<T>,
  newParentValues: T[],
  index: number,
  insertValues: Array<T>,
) {
  setParentValues(state.initialParent.el, state.initialParent.data, [
    ...newParentValues,
  ]);

  // Now get the target parent values.
  const targetParentValues = parentValues(
    state.currentParent.el,
    state.currentParent.data,
  );


  // Ensure new elements have col-span-2 by default
  const processedInsertValues = insertValues.map(value => {
    if (typeof value === 'object' && value !== null) {
      const val = value as any;
      if (val.$formkit === 'submit') {
       return {
         ...value,
         outerClass: '!col-span-2 pt-2'
       }
      }
      return {
        ...value,
        outerClass: '!col-span-2' // Force default col-span-2
      };
    }
    return value;
  });

  // Insert the processed values
  targetParentValues.splice(index, 0, ...processedInsertValues);


  setParentValues(state.currentParent.el, state.currentParent.data, [
    ...targetParentValues,
  ]);

  formSchema.value = [...(targetParentValues as FormKitSchemaFormKit[])];
}

/**
 * Performs the actual insertion of the dragged nodes into the target parent.
 *
 * @param state - The current drag state.
 */
export function handleEnd<T>(
  state: DragState<T> | SynthDragState<T> | BaseDragState<T>,
) {
  if (!isDragState(state) && !isSynthDragState(state)) return;

  const insertPoint = insertState.insertPoint;

  if (!insertState.draggedOverParent) {
    const draggedParentValues = parentValues(
      state.initialParent.el,
      state.initialParent.data,
    );

    const transferred = state.initialParent.el !== state.currentParent.el;

    const draggedValues = state.draggedNodes.map((node) => node.data.value);

    const enabledNodes = [...state.initialParent.data.enabledNodes];

    const originalIndex = state.draggedNodes[0].data.index;

    const targetIndex = insertState.targetIndex;

    if (
      !transferred &&
      insertState.draggedOverNodes[0] &&
      insertState.draggedOverNodes[0].el !== state.draggedNodes[0].el
    ) {
      // this is where it gets sorted
      let newParentValues: any = [
        ...draggedParentValues.filter(
          (x) => !draggedValues.some((y) => eq(x, y)),
        ),
      ];

      let index = insertState.draggedOverNodes[0].data.index;

      if (
        insertState.targetIndex > state.draggedNodes[0].data.index &&
        !insertState.ascending
      ) {
        index--;
      } else if (
        insertState.targetIndex < state.draggedNodes[0].data.index &&
        insertState.ascending
      ) {
        index++;
      }

      newParentValues.splice(index, 0, ...draggedValues);

      formSchema.value = [...(newParentValues as FormKitSchemaFormKit[])];

      setParentValues(state.initialParent.el, state.initialParent.data, [
        ...newParentValues,
      ]);

      if (state.initialParent.data.config.onSort) {
        const sortEventData = {
          parent: {
            el: state.initialParent.el,
            data: state.initialParent.data,
          } as ParentRecord<unknown>,
          previousValues: [...draggedParentValues],
          previousNodes: [...enabledNodes],
          nodes: [...state.initialParent.data.enabledNodes],
          values: [...newParentValues],
          draggedNodes: state.draggedNodes,
          targetNodes: insertState.draggedOverNodes,
          previousPosition: originalIndex,
          position: index,
          state: state as DragState<unknown>,
        };

        state.initialParent.data.config.onSort(sortEventData);
      }
    } else if (transferred && insertState.draggedOverNodes.length) {
      const draggedParentValues = parentValues(
        state.initialParent.el,
        state.initialParent.data,
      );

      // For the time being, we will not be removing the value of the original dragged parent.
      let index = insertState.draggedOverNodes[0].data.index || 0;

      if (insertState.ascending) index++;

      const insertValues = state.initialParent.data.config.insertConfig
        ?.dynamicValues
        ? state.initialParent.data.config.insertConfig.dynamicValues({
            sourceParent: state.initialParent,
            targetParent: state.currentParent,
            draggedNodes: state.draggedNodes,
            targetNodes: insertState.draggedOverNodes as NodeRecord<T>[],
            targetIndex: index,
          })
        : draggedValues;

      const newParentValues = [
        ...draggedParentValues.filter(
          (x) => !draggedValues.some((y) => eq(x, y)),
        ),
      ];

      if (state.currentParent.el.contains(state.initialParent.el)) {
        insertItemsIntoParentFromOutside(state, newParentValues, index, insertValues);
      } else {
        insertItemsIntoParentFromOutside(state, newParentValues, index, insertValues);
      }

      const data = {
        sourceParent: state.initialParent,
        targetParent: state.currentParent,
        initialParent: state.initialParent,
        draggedNodes: state.draggedNodes,
        targetIndex,
        targetNodes: insertState.draggedOverNodes as NodeRecord<T>[],
        state,
      };

      if (state.initialParent.data.config.onTransfer)
        state.initialParent.data.config.onTransfer(data);
      if (state.currentParent.data.config.onTransfer)
        state.currentParent.data.config.onTransfer(data);
    }
  } else if (insertState.draggedOverParent) {
    if (state.currentParent.el.contains(state.initialParent.el)) {
      const draggedParentValues = parentValues(
        state.initialParent.el,
        state.initialParent.data,
      );

      const newParentValues = [
        ...draggedParentValues.filter(
          (x) => !draggedValues.some((y) => eq(x, y)),
        ),
      ];

      setParentValues(state.initialParent.el, state.initialParent.data, [
        ...newParentValues,
      ]);

      const draggedOverParentValues = parentValues(
        insertState.draggedOverParent.el,
        insertState.draggedOverParent.data,
      );

      const draggedValues = state.draggedNodes.map((node) => node.data.value);

      const insertValues = state.initialParent.data.config.insertConfig
        ?.dynamicValues
        ? state.initialParent.data.config.insertConfig.dynamicValues({
            sourceParent: state.initialParent,
            targetParent: state.currentParent,
            draggedNodes: state.draggedNodes,
            targetNodes: insertState.draggedOverNodes as NodeRecord<T>[],
          })
        : draggedValues;

      draggedOverParentValues.push(...insertValues);

      setParentValues(
        insertState.draggedOverParent.el,
        insertState.draggedOverParent.data,
        [...draggedOverParentValues],
      );

      formSchema.value = [
        ...(draggedOverParentValues as FormKitSchemaFormKit[]),
      ];
    } else {

      const draggedValues = state.draggedNodes.map((node) => node.data.value);

      const draggedOverParentValues = parentValues(
        insertState.draggedOverParent.el,
        insertState.draggedOverParent.data,
      );

      const insertValues = state.initialParent.data.config.insertConfig
        ?.dynamicValues
        ? state.initialParent.data.config.insertConfig.dynamicValues({
            sourceParent: state.initialParent,
            targetParent: state.currentParent,
            draggedNodes: state.draggedNodes,
            targetNodes: insertState.draggedOverNodes as NodeRecord<T>[],
          })
        : draggedValues;

      draggedOverParentValues.push(...insertValues);

      setParentValues(
        insertState.draggedOverParent.el,
        insertState.draggedOverParent.data,
        [...draggedOverParentValues],
      );

      const draggedParentValues = parentValues(
        state.initialParent.el,
        state.initialParent.data,
      );

      const newParentValues = [
        ...draggedParentValues.filter(
          (x) => !draggedValues.some((y) => eq(x, y)),
        ),
      ];

      setParentValues(state.initialParent.el, state.initialParent.data, [
        ...newParentValues,
      ]);

      formSchema.value = [
        ...(draggedOverParentValues as FormKitSchemaFormKit[]),
      ];
    }

    const data: InsertEvent<T> = {
      sourceParent: state.initialParent,
      targetParent: state.currentParent,
      draggedNodes: state.draggedNodes,
      targetNodes: insertState.draggedOverNodes as NodeRecord<T>[],
      state,
    };

    if (state.initialParent.data.config.insertConfig?.insertEvent)
      state.initialParent.data.config.insertConfig.insertEvent(data);
    if (state.currentParent.data.config.insertConfig?.insertEvent)
      state.currentParent.data.config.insertConfig.insertEvent(data);

    removeClass(
      [insertState.draggedOverParent.el],
      insertState.draggedOverParent.data.config.dropZoneClass,
    );
  }

  if (insertPoint) insertPoint.el.style.display = "none";

  const dropZoneClass = isSynthDragState(state)
    ? state.initialParent.data.config.synthDropZoneClass
    : state.initialParent.data.config.dropZoneClass;

  removeClass(
    insertState.draggedOverNodes.map((node) => node.el),
    dropZoneClass,
  );

  const dragPlaceholderClass =
    state.initialParent.data.config.dragPlaceholderClass;

  removeClass(
    state.draggedNodes.map((node) => node.el),
    dragPlaceholderClass,
  );

  insertState.draggedOverNodes = [];

  insertState.draggedOverParent = null;
}
