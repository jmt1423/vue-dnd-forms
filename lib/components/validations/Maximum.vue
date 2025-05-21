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

const { isValidationChecked, isActive, updateValidationString } = useFormField(
  selectedField,
  selectedIndex,
  formSchema,
);

const maximum = ref("");
const active = isActive(isValidationChecked, "max");

function updateMaxValue() {
  if (active.value && maximum.value) {
    updateValidationString(`max:${maximum.value}`, active.value);
  }
}

function toggleMaximum() {
  updateValidationString(`max:${maximum.value}`, !active.value);
}
</script>

<template>
  <ValidationCard>
    <ValidationSwitch
      :isActive="active"
      @update:isActive="toggleMaximum"
      label="Maximum"
      tooltip="Value must be less or equal to the given value"
      :show-switch="true"
    />
    <Input
      v-show="active"
      v-model="maximum"
      @blur="updateMaxValue"
      @keyup.enter="updateMaxValue"
      placeholder="0"
      class="h-7 rounded-md px-2 py-1 text-[10px]"
      style="font-size: 10px"
    />
  </ValidationCard>
</template>
