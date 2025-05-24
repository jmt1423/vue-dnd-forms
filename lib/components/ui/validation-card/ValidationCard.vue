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
    :class="cn('py-2 rounded-lg flex flex-col justify-center gap-2', props.class)"
  >
    <slot />
  </div>
</template>
