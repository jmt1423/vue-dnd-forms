<script setup lang="ts">
import { Button } from "../../ui/button";
import { FormKitSchema } from "@formkit/vue";
import { Trash2 } from "lucide-vue-next";
import {
  formSchema,
  selectedIndex,
} from "../utils/default-form-elements.ts";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import type { FormKitSchemaFormKit } from "@formkit/core";
import { eq } from '../utils/utils.ts'
import {remapNodes} from "@formkit/drag-and-drop";

const deleteField = (index: number) => {
  formSchema.value = formSchema.value.filter(
    (_: unknown, i: number) => i !== index,
  );
  fields.value = fields.value.filter((_, i) => i !== index);
};

const clickedField = (index: number) => {
  selectedIndex.value = index;
};

const [formFields, fields] = useDragAndDrop<FormKitSchemaFormKit>([], {
  group: "form-builder",
  nativeDrag: true,
  draggingClass: "opacity-50 shadow-lg shadow-cyan-500 rounded-md",
  sortable: true,
  accepts: () => true,
  draggable: (node: any) => {
    // Only consider <li> elements that contain form fields as draggable
    return node.tagName === "LI" && node.classList.contains('!cursor-grab');
  },
  performSort({ parent, draggedNodes, targetNodes }) {
    remapNodes(parent.el)
    const draggedValues = draggedNodes.map((node) => node.data.value);

    const filteredFields = fields.value.filter(
      (field) => !draggedValues.some((d) => eq(field, d))
    );

    const insertIndex = targetNodes[0].data.index;
    filteredFields.splice(insertIndex, 0, ...draggedValues);

    fields.value = filteredFields;
    formSchema.value = filteredFields;
  },
});


</script>

<template>
  <div class="flex flex-1 flex-col">
    <div
      class="mx-auto min-h-[70%] p-4 h-fit min-w-fit w-[90%] md:w-[90%] lg:w-[70%] rounded-xl bg-primary/10 dark:bg-zinc-800 shadow-xl"
    >
      <ul ref="formFields" class="h-full w-full flex flex-col gap-1">
        <li
          v-for="(field, index) in fields"
          :key="(field as FormKitSchemaFormKit)?.$formkit + index"
          class="!mb-1 !cursor-grab"
          draggable="true"
        >
          <div class="flex items-center gap-1.5">
            <div class="flex-1" @click="clickedField(index)">
              <div
                :class="[
                  'rounded transition-all duration-200 p-1',
                  selectedIndex === index
                    ? 'border border-primary/50 bg-primary/5'
                    : 'border border-transparent hover:border-border/20 hover:bg-primary/10',
                ]"
              >
                <FormKitSchema
                  :schema="[field as FormKitSchemaFormKit]"
                  :key="`form-item-${index}`"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              @click.stop="deleteField(index)"
              class="h-4 w-4 md:h-5 md:w-5 hover:!bg-destructive/90 hover:text-white"
            >
              <Trash2 class="!h-3 !w-3" />
            </Button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>