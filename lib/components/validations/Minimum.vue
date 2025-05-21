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

const minimum = ref("");
const active = isActive(isValidationChecked, "min");

function updateMinValue() {
  if (active.value && minimum.value) {
    updateValidationString(`min:${minimum.value}`, active.value);
  }
}

function toggleMinimum() {
  updateValidationString(`min:${minimum.value}`, !active.value);
}
</script>

<template>
  <ValidationCard>
    <ValidationSwitch
      :isActive="active"
      @update:isActive="toggleMinimum"
      label="Minimum"
      tooltip="Value must be greater or equal to the given value"
      :show-switch="true"
    />
    <Input
      v-show="active"
      v-model="minimum"
      @blur="updateMinValue"
      @keyup.enter="updateMinValue"
      placeholder="0"
      class="h-7 rounded-md px-2 py-1 text-[10px]"
      style="font-size: 10px"
    />
  </ValidationCard>
</template>
