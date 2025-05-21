<script setup lang="ts">
import { useFormField } from "../../utils/composable.ts";
import {
  formSchema,
  selectedIndex,
} from "../../utils/default-form-elements.ts";
import { Input } from "../ui/input";
import { computed, ref } from "vue";
import ValidationCard from "../ui/validation-card/ValidationCard.vue";
import ValidationSwitch from "../ui/validation-card/ValidationSwitch.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value]);

const { isActive, updateValidationString, isValidationChecked } = useFormField(
  selectedField,
  selectedIndex,
  formSchema,
);

const startsWith = ref("");
const active = isActive(isValidationChecked, "starts_with");

function updateMinValue() {
  if (active.value && startsWith.value ) {
    updateValidationString(`starts_with:${startsWith.value}`, active.value);
  }
}

function toggleStartsWith() {
  updateValidationString(`starts_with:${startsWith.value}`, !active.value);
}
</script>

<template>
  <ValidationCard>
    <ValidationSwitch
      :isActive="active"
      @update:isActive="toggleStartsWith"
      label="Starts with"
      tooltip="Value must start with given string"
      :show-switch="true"
    />
    <Input
      v-show="active"
      v-model="startsWith"
      @blur="updateMinValue"
      @keyup.enter="updateMinValue"
      placeholder="Value"
      class="h-7 rounded-md px-2 py-1 text-[10px]"
      style="font-size: 10px"
    />
  </ValidationCard>
</template>
