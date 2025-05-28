<script setup lang="ts">
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import EditsLayout from "./EditsLayout.vue";
import { computed, WritableComputedRef, HTMLAttributes } from "vue";
import { cn } from "../../../utils/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  model: WritableComputedRef<any, string>;
  placeholder: string;
  label: string;
}>();

const modelValue = computed({
  get: () => props.model.value,
  set: (value: string) => {
    props.model.value = value;
  }
});

</script>

<template>
  <EditsLayout>
    <Label
      for="myInput"
      class="text-xs font-medium tracking-wide text-foreground/80"
      >{{ props.label }}</Label
    >
    <Input
      id="myInput"
      v-model="modelValue"
      :placeholder="props.placeholder"
      :class="cn('h-8 rounded-md px-2 py-1 text-xs', props.class)"
    />
  </EditsLayout>
</template>
