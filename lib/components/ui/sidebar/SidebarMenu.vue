<script setup lang="ts">
import { type HTMLAttributes, provide } from "vue";
import { cn } from "../../../utils/utils.ts";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import { defaultFormElements } from "../../../utils/default-form-elements.ts";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

function generateKey() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const [formEls, els] = useDragAndDrop(defaultFormElements, {
  group: "form-builder",
  nativeDrag: true,
  draggingClass: "opacity-70",
  sortable: false,
  accepts: () => false,
  onDragstart: ({ draggedNodes }) => {
    draggedNodes.forEach((node) => {
      if (node.data?.value) {
        const newKey = generateKey();
        node.data.value = {
          ...node.data.value,
          __key: newKey,
        };
      }
    });
  },
});

provide("formEls", els);
</script>

<template>
  <ul
    data-slot="sidebar-menu"
    ref="formEls"
    data-sidebar="menu"
    :class="cn('flex w-full min-w-0 flex-col gap-4 h-full', props.class)"
  >
    <slot />
  </ul>
</template>
