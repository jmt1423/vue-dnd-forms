<script setup lang="ts">
import { Separator } from "../ui/separator";
import ValidationSection from "./validations/ValidationSection.vue";
import { useFormField } from "../../composables/form-fields";
import EditsSection from "./edits/EditsSection.vue";

const { hasField } = useFormField();
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
        <EditsSection />
        <Separator />
        <ValidationSection />
      </div>
    </div>
  </template>
</template>
