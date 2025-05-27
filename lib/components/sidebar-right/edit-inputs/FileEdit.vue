<script setup lang="ts">
import { useFormField } from "../../../utils/composable";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import FormFieldLayout from "./FormFieldLayout.vue";
import { Label } from "../../ui/label";

const { numOfFiles } = useFormField();
</script>

<template>
  <FormFieldLayout>
    <Label for="fileNum" class="text-[11px] text-foreground/80 font-medium"
      >Number of files</Label
    >
    <ToggleGroup
      id="fileNum"
      type="single"
      :default-value="numOfFiles.value"
      v-model="numOfFiles"
      variant="outline"
      size="sm"
    >
      <ToggleGroupItem class="hover:bg-ring/30 active:bg-ring/40" value="true"
        >Multiple</ToggleGroupItem
      >
      <ToggleGroupItem class="hover:bg-ring/30 active:bg-ring/40" value="false"
        >Single</ToggleGroupItem
      >
    </ToggleGroup>
  </FormFieldLayout>
</template>
