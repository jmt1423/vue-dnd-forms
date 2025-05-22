<script setup lang="ts">
import {useFormField} from "../../../utils/composable.ts";
import {formSchema, selectedIndex} from "../../../utils/default-form-elements.ts";
import {ToggleGroup, ToggleGroupItem} from "../../ui/toggle-group";
import {computed} from "vue";
import FormFieldLayout from "./FormFieldLayout.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value])

const {
  whichNumber
} = useFormField(selectedField, selectedIndex, formSchema)
</script>

<template>
  <FormFieldLayout>
    <ToggleGroup type="single" v-model="whichNumber" variant="outline" size="sm">
      <ToggleGroupItem class="hover:bg-ring/30 active:bg-ring/40" value="float">Decimal</ToggleGroupItem>
      <ToggleGroupItem value="integer">Integer</ToggleGroupItem>
    </ToggleGroup>
  </FormFieldLayout>
</template>