<script setup lang="ts">
import { useFormField } from "../../../../../utils/composable";
import {
  formSchema,
  selectedIndex,
} from "../../../../../utils/default-form-elements";
import { computed, ref } from "vue";
import ValCard from "./ValCard.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value]);

const {isActive, updateValidationString, isValidationChecked } =
  useFormField(selectedField, selectedIndex, formSchema);

const active = isActive(isValidationChecked, 'required')

function toggleRequired(newVal: boolean) {
  active.value = newVal;
  updateValidationString('required')
}
</script>

<template>
  <ValCard
    :isActive="active"
    @update:isActive="toggleRequired"
    label="Required"
    tooltip="Value is required for completion"
    :show-switch="true"
  >
  </ValCard>
</template>
