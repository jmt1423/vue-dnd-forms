<script setup lang="ts">
import {formSchema, selectedIndex} from "../../../../utils/default-form-elements.ts";
import {Label} from "../../../../../ui/label";
import {Checkbox} from "../../../../../ui/checkbox";
import {computed} from "vue";
import {useFormField} from "../../../../utils/composable";
import ValidationLayout from "./ValidationLayout.vue";
import TextValidations from "./TextValidations.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value])
const hasField = computed(() => !!formSchema.value[selectedIndex.value])
const {
  updateValidationString
} = useFormField(selectedField, selectedIndex, formSchema)

const showTextValidation = computed(() => {
  if(!hasField.value) return false
  const excludedFields = ['text', 'textarea', 'password']
  return excludedFields.includes(formSchema.value[selectedIndex.value].$formkit)
})
</script>

<template>
  <ValidationLayout>
      <Checkbox
          @update:model-value="updateValidationString('required')"
          id="isRequired"
          class="h-4 w-4 rounded border-border text-primary focus:ring-1 focus:ring-ring"
      />
      <Label for="isRequired" class="text-[11px] font-medium tracking-wide text-foreground/80"
      >Required</Label>
  </ValidationLayout>
  <TextValidations v-if="showTextValidation"/>
</template>