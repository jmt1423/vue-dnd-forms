<script setup lang="ts">
import { useFormField } from "../../utils/composable.ts";
import {
  formSchema,
  selectedIndex,
} from "../../utils/default-form-elements.ts";
import { computed } from "vue";
import ValidationCard from "../ui/validation-card/ValidationCard.vue";
import ValidationSwitch from "../ui/validation-card/ValidationSwitch.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value]);

const {isActive, updateValidationString, isValidationChecked } =
  useFormField(selectedField, selectedIndex, formSchema);

const active = isActive(isValidationChecked, 'required')

function toggleRequired() {
  updateValidationString('required')
}
</script>

<template>
  <ValidationCard>
   <ValidationSwitch
     :isActive="active"
     @update:isActive="toggleRequired"
     label="Required"
     tooltip="Value is required for completion"
     :show-switch="true" />
  </ValidationCard>
</template>
