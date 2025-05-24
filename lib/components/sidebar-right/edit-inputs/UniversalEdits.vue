<script setup lang="ts">
import {Label} from "../../ui/label";
import {Input} from "../../ui/input";
import {useFormField} from "../../../utils/composable.ts";
import FormFieldLayout from "./FormFieldLayout.vue";

const {
  label,
  help,
} = useFormField()
</script>

<template>
  <FormFieldLayout>
    <Label class="text-[11px] font-medium tracking-wide text-foreground/80">Label</Label>
    <Input
        v-model="label"
        placeholder="Enter label"
        class="h-8 rounded px-2 py-1 text-[12px]"
        style="font-size: 10px"
    />
  </FormFieldLayout>
  <FormFieldLayout>
    <label class="text-[11px] font-medium tracking-wide text-foreground/80">Help Text</label>
    <Input
        v-model="help"
        placeholder="Enter help text"
        class="h-8 rounded px-2 py-1"
    />
  </FormFieldLayout>
</template>

<style scoped>

</style>