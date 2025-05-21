<script setup lang="ts">
import { Button } from "../../ui/button";
import { FormKitSchema } from "@formkit/vue";
import { Trash2, ChevronsLeftRight, Loader2 } from "lucide-vue-next";
import { customInsertPlugin } from "../utils/custom-insert-plugin";
import { formSchema, selectedIndex } from "../utils/default-form-elements";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import type { FormKitSchemaFormKit } from "@formkit/core";
import { isLoading } from "../utils/composable";
import { Loader } from "../../ui/loader";
import { cn } from "../utils/utils";

const deleteField = (index: number) => {
  formSchema.value = formSchema.value.filter(
    (_: unknown, i: number) => i !== index,
  );
  fields.value = fields.value.filter((_, i) => i !== index);
};

const changeColSpan = async (index: number) => {
  const classValue = formSchema.value[index].outerClass;
  if (classValue === "!col-span-2") {
    formSchema.value[index].outerClass = "!col-span-1";
  } else {
    formSchema.value[index].outerClass = "!col-span-2";
  }
  fields.value[index].outerClass = formSchema.value[index].outerClass;
};

const clickedField = (index: number) => {
  selectedIndex.value = index;
};

const insertPointClasses = [
  "absolute",
  "bg-green-500",
  "z-[2000]",
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
  formSchema.value,
  {
    group: "form-builder",
    nativeDrag: true,
    multiDrag: true,
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
  <div class="flex flex-1 flex-col justify-start mb-3">
    <div
      class="relative mx-auto md:top-10 min-h-[80%] p-4 !h-fit w-[90%] lg:w-[70%] rounded-xl bg-primary/10 dark:bg-primary/10 shadow-xl"
    >
      <Loader v-show="isLoading">
        <div
          class="flex flex-col items-center justify-center gap-3 p-4 bg-secondary rounded-lg shadow-md"
        >
          <span class="font-medium text-sm text-zinc-700 dark:text-zinc-300"
            >Creating your new form...</span
          >
          <Loader2 class="animate-spin" />
        </div>
      </Loader>
      <ul
        ref="formFields"
        :class="
          cn(
            'w-full grid grid-cols-2 gap-x-4 gap-y-2',
            fields.length === 0 ? 'h-full' : 'h-fit', // this feels jank but it works i guess
          )
        "
        data-testid="drop-area"
      >
        <li
          v-for="(field, index) in fields"
          :key="(field as FormKitSchemaFormKit)?.$formkit + index"
          :class="
            cn(
              'rounded-lg transition-all duration-200 p-1 !cursor-grab h-full !z-20',
              selectedIndex === index
                ? 'border border-primary/30 bg-primary/5'
                : 'border bg-primary/5 border-transparent hover:border-border/20 hover:bg-primary/10',
              formSchema[index].outerClass,
            )
          "
          @click="clickedField(index)"
          draggable="true"
        >
          <div class="flex justify-start gap-1.5 p-1">
            <div class="flex-1">
              <FormKitSchema
                :schema="[field as FormKitSchemaFormKit]"
                :key="`form-item-${index}`"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              @click.stop="changeColSpan(index)"
              :class="
                cn(
                  'h-4 w-4 md:h-5 md:w-5 hover:!bg-ring/90 hover:text-white',
                  formSchema[index].$formkit === 'submit' ? 'hidden' : 'visible',
                )
              "
            >
              <ChevronsLeftRight class="!h-3 !w-3" />
            </Button>
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
