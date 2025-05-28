<script setup lang="ts">
import { Input } from "../../ui/input";
import { MoveRight } from "lucide-vue-next";
import EditsLayout from "./EditsLayout.vue";
import type { WritableComputedRef } from "vue";
import { Label } from "../../ui/label";
import { computed } from "vue";

const props = defineProps<{
  modelOne: WritableComputedRef<any, number>;
  modelTwo: WritableComputedRef<any, number>;
  labelOne: string;
  labelTwo: string;
  placeholderOne: string;
  placeholderTwo: string;
}>();

const modelValue = computed({
  get: () => props.modelOne.value,
  set: (value: number) => {
    props.modelOne.value = value;
  }
})

const modelValueTwo = computed({
  get: () => props.modelTwo.value,
  set: (value: number) => {
    props.modelTwo.value = value;
  }
})
</script>

<template>
  <EditsLayout class="flex-row items-center gap-2">
    <div class="flex flex-col gap-1">
      <Label for="minInput" class="text-xs text-foreground/80">{{
        props.labelOne
      }}</Label>
      <Input
        id="minInput"
        v-model="modelValue"
        :placeholder="props.placeholderOne"
        class="h-7 rounded-md px-2 py-1 !text-xs"
      />
    </div>
    <MoveRight class="pt-4" />
    <div class="flex flex-col gap-1">
      <Label for="maxInput" class="text-xs text-foreground/80">{{
        props.labelTwo
      }}</Label>
      <Input
        id="maxInput"
        v-model="modelValueTwo"
        :placeholder="props.placeholderTwo"
        class="h-7 rounded-md px-2 py-1 !text-xs"
      />
    </div>
  </EditsLayout>
</template>
