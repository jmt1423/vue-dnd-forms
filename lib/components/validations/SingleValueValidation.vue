<script setup lang="ts">
import { useFormField } from "../../utils/composable";
import { ValidationCard, ValidationSwitch } from "../ui/validation-card"

const props = defineProps<{
  value: string;
  tooltip?: string;
  label: string;
}>()

const { isActive, updateValidationString, isValidationChecked } =
  useFormField();

const active = isActive(isValidationChecked, props.value);

function toggleSwitch() {
  updateValidationString(props.value);
}
</script>

<template>
  <ValidationCard>
    <ValidationSwitch
      :isActive="active"
      @update:isActive="toggleSwitch"
      :label="props.label"
      :tooltip="props.tooltip"
      :show-switch="true"
    />
  </ValidationCard>
</template>
