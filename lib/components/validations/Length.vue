<script setup lang="ts">
import { useFormField } from "../../utils/composable.ts";
import { getValueParts } from "../../utils/utils";
import { Input } from "../ui/input";
import { computed } from "vue";
import { MoveRight } from "lucide-vue-next";
import ValidationCard from "../ui/validation-card/ValidationCard.vue";
import ValidationSwitch from "../ui/validation-card/ValidationSwitch.vue";

const {
  updateValidationString,
  isValidationChecked,
  isActive,
  createValidationValue,
} = useFormField();

const active = isActive(isValidationChecked, "length");
const lengthValue = createValidationValue("length", active.value);

const min = computed({
  get: () => getValueParts(lengthValue.value)[0],
  set: (value: string) => {
    const [_, maxVal] = getValueParts(lengthValue.value);
    if (maxVal) {
      lengthValue.value = `${value || "0"},${maxVal}`;
    } else {
      lengthValue.value = value;
    }
  },
});

const max = computed({
  get: () => getValueParts(lengthValue.value)[1],
  set: (value: string) => {
    const [minVal, _] = getValueParts(lengthValue.value);
    if (value === "") {
      lengthValue.value = minVal || "";
    } else {
      lengthValue.value = `${minVal || "0"},${value}`;
    }
  },
});

function toggleLength() {
  if (!max.value) {
    updateValidationString(`length:${min.value}`, !active.value);
  } else if (!min.value) {
    updateValidationString(`length:0,${max.value}`, !active.value);
  } else {
    updateValidationString(`length:${min.value},${max.value}`, !active.value);
  }
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
          placeholder="10"
          class="h-7 rounded-md px-2 py-1 text-[10px]"
          style="font-size: 10px"
        />
      </div>
    </div>
  </ValidationCard>
</template>
