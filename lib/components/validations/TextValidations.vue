<script setup lang="ts">
import { useFormField } from "../../utils/composable";
import { formSchema, selectedIndex } from "../../utils/default-form-elements";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { computed } from "vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value]);

const { updateValidationString, isValidationChecked } = useFormField(
  selectedField,
  selectedIndex,
  formSchema,
);
</script>

<template>
  <Checkbox
    @update:model-value="updateValidationString('alphanumeric')"
    :model-value="isValidationChecked('alphanumeric')"
    id="isAlphanumeric"
    class="h-4 w-4 rounded border-border text-primary focus:ring-1 focus:ring-ring"
  />
  <Label
    for="isAlphanumeric"
    class="text-[11px] font-medium tracking-wide text-foreground/80"
    >Alphanumeric</Label
  >
  <Checkbox
    @update:model-value="updateValidationString('alpha_spaces')"
    :model-value="isValidationChecked('alpha_spaces')"
    id="isAlphaSpaces"
    class="h-4 w-4 rounded border-border text-primary focus:ring-1 focus:ring-ring"
  />
  <Label
    for="isAlphaSpaces"
    class="text-[11px] font-medium tracking-wide text-foreground/80"
    >Alpha+Spaces</Label
  >
  <Checkbox
    @update:model-value="updateValidationString('contains_alpha')"
    :model-value="isValidationChecked('contains_alpha')"
    id="hasAlpha"
    class="h-4 w-4 rounded border-border text-primary focus:ring-1 focus:ring-ring"
  />
  <Label
    for="hasAlpha"
    class="text-[11px] font-medium tracking-wide text-foreground/80"
    >Contains Alpha</Label
  >
  <Checkbox
    @update:model-value="updateValidationString('lowercase')"
    :model-value="isValidationChecked('lowercase')"
    id="isLowercase"
    class="h-4 w-4 rounded border-border text-primary focus:ring-1 focus:ring-ring"
  />
  <Label
    for="isLowercase"
    class="text-[11px] font-medium tracking-wide text-foreground/80"
    >Lowercase</Label
  >
  <Checkbox
    @update:model-value="updateValidationString('uppercase')"
    :model-value="isValidationChecked('uppercase')"
    id="isUppercase"
    class="h-4 w-4 rounded border-border text-primary focus:ring-1 focus:ring-ring"
  />
  <Label
    for="isUppercase"
    class="text-[11px] font-medium tracking-wide text-foreground/80"
    >Uppercase</Label
  >
</template>
