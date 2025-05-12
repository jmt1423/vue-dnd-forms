<script setup lang="ts">
import {useFormField} from "../../../../utils/composable.ts";
import {formSchema, selectedIndex} from "../../../../utils/default-form-elements.ts";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText
} from "../../../../../ui/tags-input";
import {Label} from "../../../../../ui/label";
import {computed} from "vue";
import FormFieldLayout from "./FormFieldLayout.vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value])

const {
  modelValue
} = useFormField(selectedField, selectedIndex, formSchema)
</script>

<template>
  <FormFieldLayout>
    <div>
      <Label for="selectTags" class="text-[11px] text-foreground/80 font-medium">Add Items to List</Label>
    </div>
    <div>
      <TagsInput v-model="modelValue" id="selectTags">
        <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>

        <TagsInputInput placeholder="Add Items..." />
      </TagsInput>
    </div>
  </FormFieldLayout>
</template>

<style scoped>

</style>