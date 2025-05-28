<script setup lang="ts">
import {
  selectedIndex,
  formSchema
} from "../../../utils/default-form-elements";
import { useFormField } from "../../../composables/form-fields";
import { computed } from "vue";
import TextInput from "./TextInput.vue";
import TagsInput from "./TagsInput.vue";
import ToggleInput from "./ToggleInput.vue";
import RangeInputs from "./RangeInputs.vue";

const {
  min,
  max,
  modelValue,
  label,
  placeholder,
  numOfFiles,
  whichNumber,
  help
} = useFormField();

const edits = {
  universalTextInputs: [
    {
      label: "Label",
      placeholder: "Enter label",
      model: label,
    },
    {
      label: "Help Text", 
      placeholder: "Enter help text",
      model: help,
    }
  ],
  placeholderTextInputs: [
    {
      label: "Placeholder",
      placeholder: "Enter placeholder", 
      model: placeholder,
    }
  ],
  listItemsTagsInputs: [
    {
      label: "Add Items to List",
      placeholder: "Add Items...",
      model: modelValue,
    }
  ],
  numberToggleInputs: [
    {
      label: "",
      itemLabelOne: "Decimal",
      itemLabelTwo: "Integer", 
      valueOne: "float",
      valueTwo: "integer",
      type: "single" as const,
      model: whichNumber,
    }
  ],
  fileToggleInputs: [
    {
      label: "Number of files",
      itemLabelOne: "Multiple",
      itemLabelTwo: "Single",
      valueOne: "true", 
      valueTwo: "false",
      type: "single" as const,
      model: numOfFiles,
    }
  ],
  rangeInputs: [
    {
      labelOne: "Min",
      labelTwo: "Max", 
      placeholderOne: "0",
      placeholderTwo: "10",
      modelOne: min,
      modelTwo: max,
    }
  ]
};

const hasField = computed(() => !!formSchema.value[selectedIndex.value]);

const currentFieldType = computed(() =>
  hasField.value ? formSchema.value[selectedIndex.value].$formkit : null,
);

const showForFieldType = (editType: string, fieldType: string | null) => {
  const editMap: any = {
    universalTextInputs: [
      "text",
      "textarea", 
      "email",
      "password",
      "url",
      "tel",
      "number", 
      "date",
      "datetime-local",
      "time",
      "color",
      "file",
      "range",
      "select",
      "radio", 
      "checkbox",
      "submit"
    ],
    placeholderTextInputs: [
      "text",
      "textarea",
      "email",
      "password",
      "url",
      "tel",
      "number"
    ],
    listItemsTagsInputs: ["checkbox", "radio", "select"],
    numberToggleInputs: ["number"],
    fileToggleInputs: ["file"],
    rangeInputs: ["range"]
  };
  
  return (
    !fieldType || editMap[editType]?.includes(fieldType) || false
  );
};

const visibleEdits = computed(() => {
  return {
    universalTextInputs: showForFieldType("universalTextInputs", currentFieldType.value) 
      ? edits.universalTextInputs 
      : [],
    placeholderTextInputs: showForFieldType("placeholderTextInputs", currentFieldType.value)
      ? edits.placeholderTextInputs 
      : [],
    listItemsTagsInputs: showForFieldType("listItemsTagsInputs", currentFieldType.value)
      ? edits.listItemsTagsInputs 
      : [],
    numberToggleInputs: showForFieldType("numberToggleInputs", currentFieldType.value)
      ? edits.numberToggleInputs 
      : [],
    fileToggleInputs: showForFieldType("fileToggleInputs", currentFieldType.value)
      ? edits.fileToggleInputs 
      : [],
    rangeInputs: showForFieldType("rangeInputs", currentFieldType.value)
      ? edits.rangeInputs 
      : []
  };
});
</script>

<template>
  <div
    v-if="!hasField"
    class="flex p-2 h-full text-[11px] md:text-xs text-muted-foreground"
  >
    Select a field to edit its properties
  </div>
  <template v-else>
    <div class="p-2">
      <div class="space-y-2 md:space-y-3">
        <!-- Universal Edits (Label & Help Text) -->
        <template
          v-for="(textInput, index) in visibleEdits.universalTextInputs"
          :key="`universal-${index}`"
        >
          <TextInput
            :label="textInput.label"
            :placeholder="textInput.placeholder"
            :model="textInput.model"
          />
        </template>

        <!-- Placeholder Edit -->
        <template
          v-for="(textInput, index) in visibleEdits.placeholderTextInputs"
          :key="`placeholder-${index}`"
        >
          <TextInput
            :label="textInput.label"
            :placeholder="textInput.placeholder"
            :model="textInput.model"
          />
        </template>

        <!-- List Items Edit -->
        <template
          v-for="(tagsInput, index) in visibleEdits.listItemsTagsInputs"
          :key="`list-items-${index}`"
        >
          <TagsInput
            :label="tagsInput.label"
            :placeholder="tagsInput.placeholder"
            :model="tagsInput.model"
          />
        </template>

        <!-- Number Type Edit -->
        <template
          v-for="(toggleInput, index) in visibleEdits.numberToggleInputs"
          :key="`number-toggle-${index}`"
        >
          <ToggleInput
            :label="toggleInput.label"
            :item-label-one="toggleInput.itemLabelOne"
            :item-label-two="toggleInput.itemLabelTwo"
            :value-one="toggleInput.valueOne"
            :value-two="toggleInput.valueTwo"
            :type="toggleInput.type"
            :model="toggleInput.model"
          />
        </template>

        <!-- File Edit -->
        <template
          v-for="(toggleInput, index) in visibleEdits.fileToggleInputs"
          :key="`file-toggle-${index}`"
        >
          <ToggleInput
            :label="toggleInput.label"
            :item-label-one="toggleInput.itemLabelOne"
            :item-label-two="toggleInput.itemLabelTwo"
            :value-one="toggleInput.valueOne"
            :value-two="toggleInput.valueTwo"
            :type="toggleInput.type"
            :model="toggleInput.model"
          />
        </template>

        <!-- Range Edit -->
        <template
          v-for="(rangeInput, index) in visibleEdits.rangeInputs"
          :key="`range-${index}`"
        >
          <RangeInputs
            :label-one="rangeInput.labelOne"
            :label-two="rangeInput.labelTwo"
            :placeholder-one="rangeInput.placeholderOne"
            :placeholder-two="rangeInput.placeholderTwo"
            :model-one="rangeInput.modelOne"
            :model-two="rangeInput.modelTwo"
          />
        </template>
      </div>
    </div>
  </template>
</template>