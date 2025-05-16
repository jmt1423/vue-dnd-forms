<script setup lang="ts">
import { Button } from "../../ui/button";
import { FormKitSchema } from "@formkit/vue";
import { Trash2 } from "lucide-vue-next";
import { customInsertPlugin } from "../utils/custom-insert-plugin.ts";
import { formSchema, selectedIndex } from "../utils/default-form-elements.ts";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import type { FormKitSchemaFormKit } from "@formkit/core";
import { ref } from "vue";

const deleteField = (index: number) => {
  formSchema.value = formSchema.value.filter(
    (_: unknown, i: number) => i !== index,
  );
  fields.value = fields.value.filter((_, i) => i !== index);
};

const clickedField = (index: number) => {
  selectedIndex.value = index;
};

const initialFields = ref<FormKitSchemaFormKit[]>([]);

const insertPointClasses = [
  "absolute",
  "bg-green-500",
  "z-[1000]",
  "rounded-full",
  "duration-[5ms]",
  "before:block",
  'before:content-["Drop_here"]',
  "before:whitespace-nowrap",
  "before:bg-green-500",
  "before:py-1",
  "before:px-3",
  "before:rounded-lg",
  "before:text-xs",
  "before:font-medium",
  "before:absolute",
  "before:top-1/2",
  "before:left-1/2",
  "before:-translate-y-1/2",
  "before:-translate-x-1/2",
  "before:text-white",
  "before:shadow-sm",
  "before:transition-all",
  "before:border",
  "before:border-green-400/20",
];

const [formFields, fields] = useDragAndDrop<FormKitSchemaFormKit>(
  initialFields.value,
  {
    group: "form-builder",
    nativeDrag: true,
    draggingClass: "opacity-30 rounded-md bg-green-400/50",
    accepts: () => true,
    sortable: true,
    plugins: [
      customInsertPlugin({
        insertPoint: () => {
          const div = document.createElement("div");
          for (const cls of insertPointClasses) div.classList.add(cls);
          return div;
        },
      }),
    ],
  },
);
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div
      class="mx-auto min-h-[70%] p-4 h-fit min-w-fit w-[90%] md:w-[90%] lg:w-[70%] rounded-xl bg-primary/10 dark:bg-zinc-800 shadow-xl"
    >
      <ul
        ref="formFields"
        class="h-full w-full flex flex-col gap-1"
        data-testid="drop-area"
      >
        <li
          v-for="(field, index) in fields"
          :key="(field as FormKitSchemaFormKit)?.$formkit + index"
          :class="[
            'rounded-lg transition-all duration-200 p-1 !mb-1 !cursor-grab',
            selectedIndex === index
              ? 'border border-primary/30 bg-primary/5'
              : 'border bg-primary/5 border-transparent hover:border-border/20 hover:bg-primary/10',
          ]"
          draggable="true"
        >
          <div class="flex items-center gap-1.5">
            <div class="flex-1" @click="clickedField(index)">
              <div>
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
