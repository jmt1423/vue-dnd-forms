<script setup lang="ts">
import { useFormField } from "../../utils/composable.ts";
import { Input } from "../ui/input";
import ValidationCard from "../ui/validation-card/ValidationCard.vue";
import ValidationSwitch from "../ui/validation-card/ValidationSwitch.vue";

const {
  isActive,
  updateValidationString,
  isValidationChecked,
  createValidationValue,
} = useFormField();

const active = isActive(isValidationChecked, "matches");
const matchesValue = createValidationValue("matches");

function toggleMatches() {
  updateValidationString(`matches:${matchesValue.value}`, !active.value);
}
</script>

<template>
  <ValidationCard>
    <ValidationSwitch
      :isActive="active"
      @update:isActive="toggleMatches"
      label="Matches"
      tooltip="Input must match a particular value or pattern. If you pass multiple arguments, it checks each until a match is found"
      :show-switch="true"
    />
    <Input
      v-show="active"
      v-model="matchesValue"
      placeholder="Ex: one,three,nine"
      class="h-7 rounded-md px-2 py-1 text-[10px]"
      style="font-size: 10px"
    />
  </ValidationCard>
</template>
