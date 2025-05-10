<script setup lang="ts">
import {useFormField} from "../../../../utils/composable";
import {formSchema, selectedIndex} from "../../../../utils/form-elements";
import {ToggleGroup, ToggleGroupItem} from "../../../../../ui/toggle-group";
import {computed} from "vue";
import FormFieldLayout from "./FormFieldLayout.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value])

const {
  whichNumber
} = useFormField(selectedField, selectedIndex, formSchema)
</script>

<template>
  <FormFieldLayout>
    <ToggleGroup type="single" v-model="whichNumber" variant="outline">
      <ToggleGroupItem value="float">Decimal</ToggleGroupItem>
      <ToggleGroupItem value="integer">Integer</ToggleGroupItem>
    </ToggleGroup>
  </FormFieldLayout>
</template>