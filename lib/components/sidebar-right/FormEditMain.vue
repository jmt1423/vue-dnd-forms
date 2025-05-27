<script setup lang="ts">
import UniversalEdits from "./edit-inputs/UniversalEdits.vue";
import PlaceholderEdit from "./edit-inputs/PlaceholderEdit.vue";
import ListItemsEdit from "./edit-inputs/ListItemsEdit.vue";
import NumberTypeEdit from "./edit-inputs/NumberTypeEdit.vue";
import RangeEdit from "./edit-inputs/RangeEdit.vue";
import { Separator } from "../ui/separator";
import ValidationSection from "../validations/ValidationSection.vue";
import { useFormField } from "../../utils/composable.ts";
import FileEdit from "./edit-inputs/FileEdit.vue";

const { currentFieldType, hasField, showPlaceholder, showListItems } =
  useFormField();
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
        <FileEdit v-if="currentFieldType === 'file'" />
        <Separator />
        <ValidationSection />
      </div>
    </div>
  </template>
</template>
