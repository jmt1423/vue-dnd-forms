<script setup lang="ts">
import SingleValueValidation from "./SingleValueValidation.vue";
import SingleParamValidation from "./SingleParamValidation.vue";
import DoubleParamValidation from "./DoubleParamValidation.vue";
import {
  selectedIndex,
  formSchema,
} from "../../../utils/default-form-elements";
import { computed } from "vue";

const validations = {
  singleValue: [
    {
      value: "required",
      label: "Required",
      tooltip: "Value is required for completion",
    },
    {
      value: "email",
      label: "Email",
      tooltip: "Input must be a valid email address",
    },
    {
      value: "number",
      label: "Number",
      tooltip: "Input must be a valid numeric value",
    },
    {
      value: "lowercase",
      label: "Lowercase",
      tooltip: "Input must be all lowercase letters",
    },
    {
      value: "uppercase",
      label: "Uppercase",
      tooltip: "Input must be all uppercase letters",
    },
    {
      value: "url",
      label: "URL",
      tooltip: "Input must be a valid URL",
    },
    {
      value: "alpha",
      label: "Alpha",
      tooltip: "Input must only contain letters",
    },
    {
      value: "alphanumeric",
      label: "Alphanumeric",
      tooltip: "Input must only contain letters and numbers",
    },
    {
      value: "contains_symbol",
      label: "Contains symbol",
      tooltip: "Input must contain a symbol",
    },
    {
      value: "contains_uppercase",
      label: "Contains uppercase",
      tooltip: "Input must contain an uppercase letter",
    },
    {
      value: "contains_lowercase",
      label: "Contains lowercase",
      tooltip: "Input must contain a lowercase letter",
    },
    {
      value: "contains_numeric",
      label: "Contains numeric",
      tooltip: "Input must contain a number",
    }
  ],
  singleParam: [
    {
      value: "min",
      label: "Minimum",
      tooltip: "Number must be greater or equal to the given value",
      placeholder: "0",
    },
    {
      value: "max",
      label: "Maximum",
      tooltip: "Number must be less than or equal to the given value",
      placeholder: "10",
    },
    {
      value: "matches",
      label: "Matches",
      tooltip:
        "Input must match a particular value or pattern. If you pass multiple arguments, it checks each until a match is found",
      placeholder: "Value",
    },
    {
      value: "starts_with",
      label: "Starts with",
      tooltip: "Value must start with given string",
      placeholder: "Value",
    },
    {
      value: "ends_with",
      label: "Ends with",
      tooltip: "Value must end with given string",
      placeholder: "Value",
    },
    {
      value: "date_after",
      label: "Date after",
      tooltip: "Input must be after the given date",
      placeholder: "YYYY-MM-DD",
    },
    {
      value: "date_before",
      label: "Date before",
      tooltip: "Input must be before the given date",
      placeholder: "YYYY-MM-DD",
    },
  ],
  doubleParam: [
    {
      value: "date_between",
      label: "Date between",
      tooltip: "Date must be between the given dates",
      switchLabel: "Date between",
      labelOne: "Min",
      labelTwo: "Max",
      placeholderOne: "0",
      placeholderTwo: "10",
    },
    {
      value: "length",
      label: "Length",
      tooltip: "Sentence length must be between min and max.",
      switchLabel: "Length",
      labelOne: "Min",
      labelTwo: "Max",
      placeholderOne: "0",
      placeholderTwo: "10",
    },
    {
      value: "between",
      label: "Between",
      tooltip: "Number is (inclusively) between two other numbers",
      switchLabel: "Between",
      labelOne: "Min",
      labelTwo: "Max",
      placeholderOne: "0",
      placeholderTwo: "10",
    },
  ],
};

const currentFieldType = computed(() => {
  if (selectedIndex.value !== null && formSchema.value[selectedIndex.value]) {
    return formSchema.value[selectedIndex.value].$formkit;
  }
  return null;
});

const showForFieldType = (validationType: string, fieldType: string | null) => {
  const validationMap: any = {
    required: [
      "text",
      "textarea",
      "number",
      "date",
      "radio",
      "checkbox",
      "email",
      "url",
      "color",
      "time",
      "datetime-local",
      "file",
      "password",
      "range",
      "select",
      "tel",
    ],
    alpha: ["password"],
    alphanumeric: ["password"],
    contains_symbol: ["password"],
    contains_uppercase: ["password"],
    contains_lowercase: ["password"],
    contains_numeric: ["password"],
    email: ["text", "email"],
    number: ["text", "number"],
    lowercase: ["text", "textarea", "password"],
    uppercase: ["text", "textarea", "password"],
    url: ["text", "url"],
    min: ["number", "text", "file"],
    max: ["number", "text", "file"],
    matches: ["text", "password", "url", "tel"],
    starts_with: [
      "text",
      "textarea",
      "password",
      "url",
      "tel",
      "email",
    ],
    ends_with: [
      "text",
      "textarea",
      "password",
      "url",
      "tel",
      "email",
    ],
    date_after: ["date", "datetime-local"],
    date_before: ["date", "datetime-local"],
    date_between: ["date", "datetime-local"],
    length: ["text", "textarea", "password", "url", "tel", "email"],
    between: ["number"],
  };
  return (
    !fieldType || validationMap[validationType]?.includes(fieldType) || false
  );
};

const visibleValidations = computed(() => {
  return {
    singleValue: validations.singleValue.filter((validation) =>
      showForFieldType(validation.value, currentFieldType.value),
    ),
    singleParam: validations.singleParam.filter((validation) =>
      showForFieldType(validation.value, currentFieldType.value),
    ),
    doubleParam: validations.doubleParam.filter((validation) =>
      showForFieldType(validation.value, currentFieldType.value),
    ),
  };
});
</script>

<template>
  <div v-if="formSchema[selectedIndex].$formkit !== 'submit'">
    <span class="text-sm">Validations</span>
  </div>

  <template
    v-for="validation in visibleValidations.singleValue"
    :key="validation.value"
  >
    <SingleValueValidation
      :value="validation.value"
      :tooltip="validation.tooltip"
      :label="validation.label"
    />
  </template>

  <template
    v-for="validation in visibleValidations.singleParam"
    :key="validation.value"
  >
    <SingleParamValidation
      :value="validation.value"
      :tooltip="validation.tooltip"
      :label="validation.label"
      :placeholder="validation.placeholder"
    />
  </template>

  <template
    v-for="validation in visibleValidations.doubleParam"
    :key="validation.value"
  >
    <DoubleParamValidation
      :value="validation.value"
      :tooltip="validation.tooltip"
      :switch-label="validation.switchLabel"
      :label-one="validation.labelOne"
      :label-two="validation.labelTwo"
      :placeholder-one="validation.placeholderOne"
      :placeholder-two="validation.placeholderTwo"
    />
  </template>
</template>
