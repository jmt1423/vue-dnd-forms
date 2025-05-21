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

const startsWith = ref("");
const isActive = ref(hasParameterizedValidation("starts_with"));

function updateMinValue() {
  if (isActive.value) {
    const startsWithVal = `${startsWith.value}`;
    updateParameterizedValidation("starts_with", startsWithVal, true);
  }
}

function toggleStartsWith(newVal: boolean) {
  isActive.value = newVal;
  const startsWithVal = `${startsWith.value}`;
  updateParameterizedValidation("starts_with", startsWithVal, newVal);
}
</script>

<template>
  <ValCard
    :isActive="isActive"
    @update:isActive="toggleStartsWith"
    label="Starts with"
    tooltip="Value must start with given string"
    :show-switch="true"
  >
    <Input
      v-show="isActive"
      v-model="startsWith"
      @input="updateMinValue"
      @change="updateMinValue"
      placeholder="0"
      class="h-7 rounded-md px-2 py-1 text-[10px]"
      style="font-size: 10px"
    />
  </ValCard>
</template>
