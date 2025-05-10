<script setup lang="ts">
import {computed} from "vue";
import {formSchema, selectedIndex} from "../../../utils/form-elements";
import FieldTypeHeader from "./FieldTypeHeader.vue";
import UniversalEdits from "./edit-inputs/UniversalEdits.vue";
import PlaceholderEdit from "./edit-inputs/PlaceholderEdit.vue";
import ListItemsEdit from "./edit-inputs/ListItemsEdit.vue";
import NumberTypeEdit from "./edit-inputs/NumberTypeEdit.vue";
import RangeEdit from "./edit-inputs/RangeEdit.vue";
import {Separator} from "../../../../ui/separator";
import ValidationSection from "./validations/ValidationSection.vue";

const hasField = computed(() => !!formSchema.value[selectedIndex.value])
const currentFieldType = computed(() => hasField.value ? formSchema.value[selectedIndex.value].$formkit : null)

const showPlaceholder = computed(() => {
  if(!hasField.value) return false
  const excludedFields = ['checkbox', 'radio', 'date', 'time', 'datetime-local', 'color', 'file', 'select', 'range']
  return !excludedFields.includes(formSchema.value[selectedIndex.value].$formkit)
})

const showListItems = computed(() => {
  if(!hasField.value) return false
  const excludedFields = ['checkbox', 'radio', 'select']
  return excludedFields.includes(formSchema.value[selectedIndex.value].$formkit)
})
</script>

<template>
  <div v-if="!hasField" class="flex p-2 h-full text-[11px] md:text-xs text-muted-foreground">
    Select a field to edit its properties
  </div>
  <template v-else>
    <div class="p-2">
      <div class="space-y-2 md:space-y-3">
        <FieldTypeHeader :field-type="currentFieldType" />
        <UniversalEdits />
        <PlaceholderEdit v-if="showPlaceholder" />
        <ListItemsEdit v-if="showListItems" />
        <NumberTypeEdit v-if="currentFieldType === 'number'" />
        <RangeEdit v-if="currentFieldType==='range'"/>
        <Separator />
        <ValidationSection />
      </div>
    </div>
  </template>
</template>