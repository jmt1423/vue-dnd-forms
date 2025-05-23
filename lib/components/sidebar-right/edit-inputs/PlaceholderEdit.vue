<script setup lang="ts">
import {useFormField} from "../../../utils/composable.ts";
import {Label} from "../../ui/label";
import {Input} from "../../ui/input";
import FormFieldLayout from "./FormFieldLayout.vue";


const {
  placeholder
} = useFormField()
</script>

<template>
  <FormFieldLayout>
    <Label class="text-[11px] font-medium tracking-wide text-foreground/80">Placeholder</Label>
    <Input
        v-model="placeholder"
        placeholder="Enter placeholder"
        class="h-7 rounded px-2 py-1 text-[10px]"
        style="font-size: 10px"
    />
  </FormFieldLayout>
</template>