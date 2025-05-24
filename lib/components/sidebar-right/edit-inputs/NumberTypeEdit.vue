<script setup lang="ts">
import {useFormField} from "../../../utils/composable.ts";
import {ToggleGroup, ToggleGroupItem} from "../../ui/toggle-group";
import FormFieldLayout from "./FormFieldLayout.vue";

const {
  whichNumber
} = useFormField()
</script>

<template>
  <FormFieldLayout>
    <ToggleGroup type="single" v-model="whichNumber" variant="outline" size="sm">
      <ToggleGroupItem class="hover:bg-ring/30 active:bg-ring/40" value="float">Decimal</ToggleGroupItem>
      <ToggleGroupItem value="integer">Integer</ToggleGroupItem>
    </ToggleGroup>
  </FormFieldLayout>
</template>