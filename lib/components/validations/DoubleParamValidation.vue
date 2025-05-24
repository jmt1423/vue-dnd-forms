<script setup lang="ts">
import { useFormField } from "../../utils/composable";
import { getValueParts } from "../../utils/utils";
import { Input } from "../ui/input";
import { computed } from "vue";
import { MoveRight } from "lucide-vue-next";
import { ValidationCard, ValidationSwitch } from '../ui/validation-card'

const props = defineProps<{
  value: string;
  tooltip: string;
  switchLabel: string;
  labelOne: string;
  labelTwo: string;
  placeholderOne: string;
  placeholderTwo: string;
}>();

const {
  updateValidationString,
  isValidationChecked,
  isActive,
  createValidationValue,
} = useFormField();

const active = isActive(isValidationChecked, props.value);
const validation = createValidationValue(props.value);

const min = computed({
  get: () => getValueParts(validation.value)[0],
  set: (value) => {
    const [_, maxVal] = getValueParts(validation.value);

    validation.value =
      props.value === "between"
        ? `${value},${maxVal}`
        : maxVal
          ? `${value || "0"},${maxVal}`
          : value;

    // if (props.value === "between") {
    //   validation.value = `${value},${maxVal}`;
    // } else if (props.value === "length") {
    //   validation.value = maxVal ? `${value || "0"},${maxVal}` : value;
    // }
  },
});

const max = computed({
  get: () => getValueParts(validation.value)[1],
  set: (value) => {
    const [minVal, _] = getValueParts(validation.value);

    validation.value =
      props.value === "between"
        ? `${minVal},${value}`
        : value === ""
          ? minVal || ""
          : `${minVal || "0"},${value}`;

    // props.value === "between"
    //   ? (validation.value = `${minVal},${value}`)
    //   : (validation.value =
    //       value === "" ? minVal || "" : `${minVal || "0"},${value}`);

    // if (props.value === "between") {
    //   validation.value = `${minVal},${value}`;
    // } else if (props.value === "length") {
    //   validation.value =
    //     value === "" ? minVal || "" : `${minVal || "0"},${value}`;
    // }
  },
});

const toggleSwitch = () => {
  if (props.value === "between") {
    updateValidationString(`between:${min.value},${max.value}`, !active.value);
  } else {
    updateValidationString(
      !max.value
        ? `length:${min.value}`
        : !min.value
          ? `length:0,${max.value}`
          : `length:${min.value},${max.value}`,
      !active.value,
    );
  }
};
</script>

<template>
  <ValidationCard>
    <ValidationSwitch
      :isActive="active"
      @update:isActive="toggleSwitch"
      :label="props.switchLabel"
      tooltip="Number is (inclusively) between two other numbers"
      :show-switch="true"
    />
    <div class="flex flex-row gap-2" v-if="active">
      <div class="flex flex-col gap-1">
        <span class="text-xs">{{ props.labelOne }}</span>
        <Input
          v-model="min"
          :placeholder="props.placeholderOne"
          class="h-7 rounded-md px-2 py-1 text-[10px]"
        />
      </div>
      <MoveRight class="mt-5" />
      <div class="flex flex-col gap-1">
        <span class="text-xs">{{ props.labelTwo }}</span>
        <Input
          v-model="max"
          :placeholder="props.placeholderTwo"
          class="h-7 rounded-md px-2 py-1 text-[10px]"
        />
      </div>
    </div>
    <span v-if="max < min && active" class="text-xs text-destructive"
      >{{ props.labelOne }} is higher than {{ props.labelTwo }}</span
    >
    <span
      v-if="
        (!max || !min) &&
        (props.value === 'between' || props.value === 'date_between') &&
        active
      "
      class="text-xs text-destructive"
      >Both values must be set</span
    >
  </ValidationCard>
</template>
