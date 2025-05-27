<script setup lang="ts">
import {useFormField} from "../../../utils/composable.ts";
import {Input} from "../../ui/input";
import {MoveRight} from "lucide-vue-next";
import FormFieldLayout from "./FormFieldLayout.vue";

const {
  min,
  max
} = useFormField()
</script>

<template>
  <FormFieldLayout class="flex-row items-center gap-2">
    <div class="flex flex-col gap-1">
      <span class="text-xs">Min</span>
      <Input
          v-model="min"
          placeholder="0"
          class="h-7 rounded-md px-2 py-1 text-[10px]"
      />
    </div>
    <MoveRight class="pt-4" />
    <div class="flex flex-col gap-1">
      <span class="text-xs">Max</span>
      <Input
          v-model="max"
          placeholder="10"
          class="h-7 rounded-md px-2 py-1 text-[10px]"
      />
    </div>
  </FormFieldLayout>
</template>