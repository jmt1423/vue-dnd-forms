<script setup lang="ts">

import {formSchema, selectedField} from "../utils/form-elements";
import {fieldProps} from "../utils/field-props";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../../ui/tooltip";
import {CircleHelp, MoveRight} from "lucide-vue-next";
import {ScrollArea} from "../../ui/scroll-area";
import {Input} from "../../ui/input";
import {Checkbox} from "../../ui/checkbox";
import {useFormField} from "../utils/composable.ts";
import {computed} from "vue";
import {TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText} from "../../ui/tags-input";
import {Label} from "../../ui/label";
import {ToggleGroup, ToggleGroupItem} from "../../ui/toggle-group";

const selectedField1 = computed(() => formSchema.value[selectedField.value])
const {
  label,
  placeholder,
  handleChangeRequired,
  help,
  modelValue,
  whichNumber,
  min,
  max
} = useFormField(selectedField1, selectedField, formSchema)
</script>

<template>
    <div class="flex flex-col !h-fit">
      <ScrollArea class="h-full w-fit">
        <div class="p-2">
          <div
              v-if="!formSchema[selectedField]"
              class="flex items-center justify-center h-full text-[11px] md:text-xs lg:text-xs text-muted-foreground"
          >
            Select a field to edit its properties
          </div>
          <div v-if="formSchema[selectedField]" class="space-y-2 md:space-y-3">
            <div class="gap-1 pb-1 md:pb-2">
              <div class="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-transparent shadow-sm">
                <component
                    :is="fieldProps.find((prop) => prop.name === formSchema[selectedField].$formkit)?.icon"
                    class="!h-3 !w-3 md:h-4 md:w-4 text-primary"
                />
                <span
                    class="text-xs md:text-xs lg:text-xs font-medium text-foreground/80 capitalize"
                >{{ formSchema[selectedField].$formkit }}</span
                >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleHelp class="h-4 w-4 color-black muted rounded-full text-primary" />
                    </TooltipTrigger>
                    <TooltipContent>
                      {{ fieldProps.find((prop) => prop.name === formSchema[selectedField].$formkit)?.tooltip }}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-4 p-2" v-if="formSchema[selectedField]">
          <div class="flex flex-col gap-1">
            <label class="text-[11px] font-medium tracking-wide text-foreground/80">Label</label>
            <Input
                v-model="label"
                placeholder="Enter label"
                class="h-7 rounded px-2 py-1 text-[10px]"
                style="font-size: 10px"
            />
          </div>
          <div class="flex flex-col gap-1" v-if="formSchema[selectedField] &&
            (formSchema[selectedField].$formkit !== 'checkbox' &&
             formSchema[selectedField].$formkit !== 'radio' &&
             formSchema[selectedField].$formkit !== 'date' &&
             formSchema[selectedField].$formkit !== 'time' &&
             formSchema[selectedField].$formkit !== 'datetime-local' &&
             formSchema[selectedField].$formkit !== 'color' &&
             formSchema[selectedField].$formkit !== 'file' &&
             formSchema[selectedField].$formkit !== 'range' &&
             formSchema[selectedField].$formkit !== 'select')">
            <label class="text-[11px] font-medium tracking-wide text-foreground/80">Placeholder</label>
            <Input
                v-model="placeholder"
                placeholder="Enter placeholder"
                class="h-7 rounded px-2 py-1 text-[10px]"
                style="font-size: 10px"
            />
          </div>
          <div class="flex flex-col gap-1" v-if="formSchema[selectedField]">
            <label class="text-[11px] font-medium tracking-wide text-foreground/80">Help Text</label>
            <Input
                v-model="help"
                placeholder="Enter help text"
                class="h-7 rounded px-2 py-1 text-[10px]"
                style="font-size: 10px"
            />
          </div>
          <div class="flex flex-col gap-2" v-if="formSchema[selectedField] &&
            (formSchema[selectedField].$formkit === 'checkbox' ||
             formSchema[selectedField].$formkit === 'radio' ||
             formSchema[selectedField].$formkit === 'select')">
            <div>
              <Label for="selectTags" class="text-[11px] text-foreground/80 font-medium">Add Items to List</Label>
            </div>
            <div>
              <TagsInput v-model="modelValue" id="selectTags">
                <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
                  <TagsInputItemText />
                  <TagsInputItemDelete />
                </TagsInputItem>

                <TagsInputInput placeholder="Add Items..." />
              </TagsInput>
            </div>
          </div>
          <div class="flex items-center gap-2" v-if="formSchema[selectedField].$formkit === 'number'">
            <ToggleGroup type="single" v-model="whichNumber" variant="outline">
              <ToggleGroupItem value="float">Decimal</ToggleGroupItem>
              <ToggleGroupItem value="integer">Integer</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div class="flex flex-row gap-2 justify-center items-center" v-if="formSchema[selectedField].$formkit === 'range'">
            <div class="flex flex-col gap-1">
              <span class="text-xs">Min</span>
              <Input
                  v-model="min"
                  placeholder="0"
                  class="h-7 rounded-md px-2 py-1 text-[10px]"
                  style="font-size: 10px"
              />
            </div>
            <MoveRight class="pt-3" />
            <div class="flex flex-col gap-1">
              <span class="text-xs">Max</span>
              <Input
                  v-model="max"
                  placeholder="10"
                  class="h-7 rounded-md px-2 py-1 text-[10px]"
                  style="font-size: 10px"
              />
            </div>
          </div>
          <div class="flex items-center gap-2" v-if="formSchema[selectedField]">
            <Checkbox
                @update:model-value="handleChangeRequired()"
                id="isRequired"
                class="h-4 w-4 rounded border-border text-primary focus:ring-1 focus:ring-ring"
            />
            <label for="isRequired" class="text-[11px] font-medium tracking-wide text-foreground/80"
            >Required</label
            >
          </div>
        </div>
      </ScrollArea>
    </div>
</template>

<style scoped>

</style>