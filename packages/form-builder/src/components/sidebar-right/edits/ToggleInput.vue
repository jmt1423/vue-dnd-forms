<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import EditsLayout from "./EditsLayout.vue";
import { Label } from "../../ui/label";
import type { WritableComputedRef } from "vue";
import { computed } from "vue";

const props = defineProps<{
  model: WritableComputedRef<any, string>;
  label: string;
  itemLabelOne: string;
  itemLabelTwo: string;
  valueOne: string;
  valueTwo: string;
  type: "single" | "multiple" | undefined;
}>();

const modelValue = computed({
  get: () => props.model.value,
  set: (value: string) => {
    props.model.value = value;
  }
})
</script>

<template>
  <EditsLayout>
    <Label for="tgroup" class="text-xs text-foreground/80">{{
      props.label
    }}</Label>
    <ToggleGroup
      id="tgroup"
      :type="props.type"
      :default-value="modelValue.value"
      v-model="modelValue"
      variant="outline"
      size="sm"
    >
      <ToggleGroupItem
        :value="props.valueOne"
        class="hover:bg-ring/30 active:bg-ring/40"
        >{{ props.itemLabelOne }}</ToggleGroupItem
      >
      <ToggleGroupItem
        :value="props.valueTwo"
        class="hover:bg-ring/30 active:bg-ring/40"
        >{{ props.itemLabelTwo }}</ToggleGroupItem
      >
    </ToggleGroup>
  </EditsLayout>
</template>
