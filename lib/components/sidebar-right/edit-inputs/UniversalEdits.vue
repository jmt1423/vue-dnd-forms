<script setup lang="ts">
import {Label} from "../../ui/label";
import {Input} from "../../ui/input";
import {formSchema, selectedIndex} from "../../../utils/default-form-elements.ts";
import {computed} from "vue";
import {useFormField} from "../../../utils/composable.ts";
import FormFieldLayout from "./FormFieldLayout.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value])

const {
  label,
  help,
} = useFormField(selectedField, selectedIndex, formSchema)
</script>

<template>
  <FormFieldLayout>
    <Label class="text-[11px] font-medium tracking-wide text-foreground/80">Label</Label>
    <Input
        v-model="label"
        placeholder="Enter label"
        class="h-7 rounded px-2 py-1 text-[10px]"
        style="font-size: 10px"
    />
  </FormFieldLayout>
  <FormFieldLayout>
    <label class="text-[11px] font-medium tracking-wide text-foreground/80">Help Text</label>
    <Input
        v-model="help"
        placeholder="Enter help text"
        class="h-7 rounded px-2 py-1 text-[10px]"
        style="font-size: 10px"
    />
  </FormFieldLayout>
</template>

<style scoped>

</style>