<script setup lang="ts">
import { useFormField } from "../../utils/composable";
import { getValueParts } from "../../utils/utils";
import { Input } from "../ui/input";
import { computed } from "vue";
import { MoveRight } from "lucide-vue-next";
import ValidationCard from "../ui/validation-card/ValidationCard.vue";
import ValidationSwitch from "../ui/validation-card/ValidationSwitch.vue";

const { updateValidationString, isValidationChecked, isActive, createValidationValue } = useFormField();

const betweenValue = createValidationValue("between");
const active = isActive(isValidationChecked, "between");

const min = computed({
  get: () => getValueParts(betweenValue.value)[0],
  set: (value) => {
    const [_, maxVal] = getValueParts(betweenValue.value);
    betweenValue.value = `${value},${maxVal}`;
  }
});

const max = computed({
  get: () => getValueParts(betweenValue.value)[1],
  set: (value) => {
    const [minVal, _] = getValueParts(betweenValue.value);
    betweenValue.value = `${minVal},${value}`;
  }
});

const toggleBetween = () => {
  updateValidationString(`between:${min.value},${max.value}`, !active.value);
};
</script>

<template>
  <ValidationCard>
    <ValidationSwitch
      :isActive="active"
      @update:isActive="toggleBetween"
      label="Between"
      tooltip="Number is (inclusively) between two other numbers"
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
    <span v-show="max < min && active" class="text-xs text-destructive">Minimum is higher than maximum</span>
  </ValidationCard>
</template>