<script setup lang="ts">
import { useFormField } from "../../../../../utils/composable";
import {
  formSchema,
  selectedIndex,
} from "../../../../../utils/default-form-elements";
import { Input } from "../../../../../../ui/input";
import { computed, ref } from "vue";
import ValidationLayout from "../ValidationLayout.vue";
import { Switch } from "../../../../../../ui/switch";
import { MoveRight } from "lucide-vue-next";
import ValCard from "./ValCard.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value]);

const { updateParameterizedValidation, hasParameterizedValidation } =
  useFormField(selectedField, selectedIndex, formSchema);

const min = ref("");
const max = ref("");

const isActive = ref(hasParameterizedValidation("length"));

function updateLengthValue() {
  if (isActive.value) {
    const lengthVal = `${min.value},${max.value}`;
    updateParameterizedValidation("length", lengthVal, true);
  }
}

function toggleLength(newVal: boolean) {
  isActive.value = newVal;
  const lengthVal = `${min.value},${max.value}`;
  updateParameterizedValidation("length", lengthVal, newVal);
}
</script>

<template>
  <ValCard
    :isActive="isActive"
    @update:isActive="toggleLength"
    label="Length"
    tooltip="Number of characters must be within range"
    :show-switch="true"
  >
    <div class="flex flex-row gap-2" v-show="isActive">
      <div class="flex flex-col gap-1">
        <span class="text-xs">Min</span>
        <Input
          v-model="min"
          @input="updateLengthValue"
          @change="updateLengthValue"
          placeholder="0"
          class="h-7 rounded-md px-2 py-1 text-[10px]"
          style="font-size: 10px"
        />
      </div>
      <MoveRight class="mt-5" />
      <div class="flex flex-col gap-1">
        <span class="text-xs">Max</span>
        <Input
          v-model="max"
          @input="updateLengthValue"
          @change="updateLengthValue"
          placeholder="10"
          class="h-7 rounded-md px-2 py-1 text-[10px]"
          style="font-size: 10px"
        />
      </div>
    </div>
  </ValCard>
</template>
