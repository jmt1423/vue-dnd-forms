<script setup lang="ts">
import { cn } from "../../../utils/utils";
import { type HTMLAttributes } from "vue";
import { Loader2 } from "lucide-vue-next";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div
    :class="
      cn('absolute inset-0 mb-30 flex items-center justify-center z-50', props.class)
    "
  >
    <div
      class="flex flex-col items-center bg-neutral-600 justify-center gap-3 p-4 rounded-lg shadow-md"
    >
      <span class="font-medium text-sm text-zinc-700 dark:text-zinc-300"
        >Creating your new form...</span
      >
      <Loader2 class="animate-spin" />
    </div>
  </div>
</template>
