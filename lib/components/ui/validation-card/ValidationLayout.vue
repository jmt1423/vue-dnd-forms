<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils/utils.ts";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn('flex flex-row items-center gap-2 p-2', props.class)">
    <div class="flex flex-col gap-1">
      <slot />
    </div>
  </div>
</template>
