<script setup lang="ts">
import { useFormField } from "../../utils/composable";
import { Input } from "../ui/input";
import { ValidationCard, ValidationSwitch } from "../ui/validation-card";
import { DatePicker } from "../ui/date-picker";

const props = defineProps<{
  value: string;
  tooltip: string;
  label: string;
  placeholder: string;
}>();

const {
  isActive,
  createValidationValue,
  updateValidationString,
  isValidationChecked,
} = useFormField();

const active = isActive(isValidationChecked, props.value);
const paramValue = createValidationValue(props.value, active.value);

const toggleSwitch = () => {
  updateValidationString(`${props.value}:${paramValue.value}`, !active.value);
};
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
    <Input
      v-if="active && props.value !== 'date_after' && props.value !== 'date_before'"
      v-model="paramValue"
      :placeholder="props.placeholder"
      class="h-7 rounded-md px-2 py-1 text-[10px]"
      style="font-size: 10px"
    />
    <DatePicker
      v-if="active && (props.value === 'date_after' || props.value === 'date_before')"
      v-model="paramValue"
    />
  </ValidationCard>
</template>
