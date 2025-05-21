<script setup lang="ts">
import { cn } from "../../../utils/utils.ts";
import type { HTMLAttributes } from "vue";
import { computed } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <div
    v-bind="delegatedProps"
    :class="cn('border-1 border-ring/20 p-2 rounded-lg flex items-center', props.class)"
  >
    <slot />
  </div>
</template>
