<script setup lang="ts">
import { useFormField } from "../../utils/composable.ts";
import {
  formSchema,
  selectedIndex,
} from "../../utils/default-form-elements.ts";
import { Input } from "../ui/input";
import { computed } from "vue";
import ValidationCard from "../ui/validation-card/ValidationCard.vue";
import ValidationSwitch from "../ui/validation-card/ValidationSwitch.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value]);

const { isActive, updateValidationString, isValidationChecked, createValidationValue } = useFormField(
  selectedField,
  selectedIndex,
  formSchema,
);

const active = isActive(isValidationChecked, "starts_with");
const startsWith = createValidationValue("starts_with");

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
      placeholder="Value"
      class="h-7 rounded-md px-2 py-1 text-[10px]"
      style="font-size: 10px"
    />
  </ValidationCard>
</template>
