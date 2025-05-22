<script setup lang="ts">
import { useFormField } from "../../utils/composable.ts";
import {
  formSchema,
  selectedIndex,
} from "../../utils/default-form-elements.ts";
import { Input } from "../ui/input";
import { computed, ref } from "vue";
import { MoveRight } from "lucide-vue-next";
import ValidationCard from "../ui/validation-card/ValidationCard.vue";
import ValidationSwitch from "../ui/validation-card/ValidationSwitch.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value]);

const {updateValidationString, isValidationChecked, isActive } =
  useFormField(selectedField, selectedIndex, formSchema);

const min = ref("");
const max = ref("");
const active = isActive(isValidationChecked, "length");

function updateLengthValue() {
  if (active.value && min.value && max.value) {
    updateValidationString(`length:${min.value},${max.value}`, active.value);
  }
}

function toggleLength() {
  updateValidationString(`length:${min.value},${max.value}`, !active.value);
}
</script>

<template>
  <ValidationCard>
    <ValidationSwitch
      :isActive="active"
      @update:isActive="toggleLength"
      label="Length"
      tooltip="Number of characters must be within range"
      :show-switch="true"
    />
    <div class="flex flex-row gap-2" v-show="active">
      <div class="flex flex-col gap-1">
        <span class="text-xs">Min</span>
        <Input
          v-model="min"
          @blur="updateLengthValue"
          @keyup.enter="updateLengthValue"
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
          @blur="updateLengthValue"
          @keyup.enter="updateLengthValue"
          placeholder="10"
          class="h-7 rounded-md px-2 py-1 text-[10px]"
          style="font-size: 10px"
        />
      </div>
    </div>
    <span v-show="max < min && active" class="text-xs text-destructive">Minimum is higher than maximum</span>
  </ValidationCard>
</template>
