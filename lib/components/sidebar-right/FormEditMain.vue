<script setup lang="ts">
import { computed } from "vue";
import {
  formSchema,
  selectedIndex,
} from "../../utils/default-form-elements.ts";
import UniversalEdits from "./edit-inputs/UniversalEdits.vue";
import PlaceholderEdit from "./edit-inputs/PlaceholderEdit.vue";
import ListItemsEdit from "./edit-inputs/ListItemsEdit.vue";
import NumberTypeEdit from "./edit-inputs/NumberTypeEdit.vue";
import RangeEdit from "./edit-inputs/RangeEdit.vue";
import { Separator } from "../ui/separator";
import ValidationSection from "../validations/ValidationSection.vue";
import { useFormField } from "../../utils/composable.ts";

const selectedField = computed(() => formSchema.value[selectedIndex.value]);
const { currentFieldType, hasField, showPlaceholder, showListItems } =
  useFormField(selectedField, selectedIndex, formSchema);
</script>

<template>
  <div
    v-if="!hasField"
    class="flex p-2 h-full text-[11px] md:text-xs text-muted-foreground"
  >
    Select a field to edit its properties
  </div>
  <template v-else>
    <div class="p-2">
      <div class="space-y-2 md:space-y-3">
        <UniversalEdits />
        <PlaceholderEdit v-if="showPlaceholder" />
        <ListItemsEdit v-if="showListItems" />
        <NumberTypeEdit v-if="currentFieldType === 'number'" />
        <RangeEdit v-if="currentFieldType === 'range'" />
        <Separator />
        <ValidationSection />
      </div>
    </div>
  </template>
</template>
