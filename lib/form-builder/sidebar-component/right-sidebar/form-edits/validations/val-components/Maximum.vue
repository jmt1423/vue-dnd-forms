<script setup lang="ts">
import { useFormField } from "../../../../../utils/composable";
import {
  formSchema,
  selectedIndex,
} from "../../../../../utils/default-form-elements";
import { Input } from "../../../../../../ui/input";
import { computed, ref } from "vue";
import ValCard from "./ValCard.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value]);

const { updateParameterizedValidation, hasParameterizedValidation } =
  useFormField(selectedField, selectedIndex, formSchema);

const maximum = ref("");
const isActive = ref(hasParameterizedValidation("max"));

function updateMaxValue() {
  if (isActive.value) {
    const maxVal = `${maximum.value}`;
    updateParameterizedValidation("max", maxVal, true);
  }
}

function toggleMaximum(newVal: boolean) {
  isActive.value = newVal;
  const maxVal = `${maximum.value}`;
  updateParameterizedValidation("max", maxVal, newVal);
}
</script>

<template>
  <ValCard
    :isActive="isActive"
    @update:isActive="toggleMaximum"
    label="Maximum"
    tooltip="Value must be less or equal to the given value"
    :show-switch="true"
  >
    <Input
      v-show="isActive"
      v-model="maximum"
      @input="updateMaxValue"
      @change="updateMaxValue"
      placeholder="0"
      class="h-7 rounded-md px-2 py-1 text-[10px]"
      style="font-size: 10px"
    />
  </ValCard>
</template>
