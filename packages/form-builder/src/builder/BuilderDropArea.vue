<script setup lang="ts">
import { Button } from "../components/ui/button";
import { FormKitSchema } from "@formkit/vue";
import { Trash2, ChevronsLeftRight } from "lucide-vue-next";
import { customInsertPlugin } from "../utils/custom-insert-plugin";
import { formSchema, selectedIndex } from "../utils/default-form-elements";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import type { FormKitSchemaFormKit } from "@formkit/core";
import { isLoading } from "../composables/form-fields";
import { Loader } from "../components/ui/loader";
import { cn } from "../utils/utils";
import { useFormField } from "../composables/form-fields";

const { validationStringLength } = useFormField();

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

const pluralize = (count: number, noun: string, suffix = "s") => {
  return count === 1 ? noun : noun + suffix;
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
  "before:bg-green-900",
  "before:py-1",
  "before:h-6",
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
    draggingClass: "opacity-5 bg-green-400/50",
    accepts: () => true,
    sortable: true,
    draggable: () => true,
    handleNodePointerup(data) {
      data.targetData.node.el.setAttribute("draggable", "true");
    },
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
  <div class="flex flex-1 flex-col justify-start mb-15">
    <Loader v-if="isLoading" />
    <div
      class="border-1 border-ring/5 dark:border-none relative mx-auto md:top-10 min-h-[80%] p-4 !h-fit w-[90%] lg:w-[70%] rounded-xl bg-ring/5 dark:bg-neutral-800/70 shadow-md"
    >
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
              'rounded-lg transition-all duration-200 p-1 !cursor-grab h-full !z-20 relative',
              selectedIndex === index
                ? 'border border-ring/30 bg-ring/20 dark:bg-accent/20 dark:border-ring/5 transition-all duration-300'
                : 'border bg-ring/5 border-transparent hover:border-ring/30 dark:bg-ring/3 dark:hover:border-ring/10 transition-all duration-200',
              formSchema[index].outerClass,
            )
          "
          @click="clickedField(index)"
        >
          <div class="flex gap-1.5 p-1 w-full pb-2">
            <div class="flex-1 w-full">
              <FormKitSchema
                :schema="[field as FormKitSchemaFormKit]"
                :key="`form-item-${index}`"
              />
            </div>
          </div>
          <div class="absolute bottom-1 right-1 flex flex-row">
            <div
              class="px-2 mr-1 border-1 border-ring/40 dark:border-ring/20 rounded-md flex items-center justify-center"
              v-if="selectedIndex === index"
            >
              <span class="text-xs"
                >{{ validationStringLength }}
                {{ pluralize(validationStringLength, "rule") }}</span
              >
            </div>
            <Button
              variant="ghost"
              size="icon"
              @click.stop="changeColSpan(index)"
              :class="
                cn(
                  'h-4 w-4 md:h-5 md:w-5 hover:!bg-ring/90 hover:text-white',
                  formSchema[index].$formkit === 'submit'
                    ? 'hidden'
                    : 'visible',
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
