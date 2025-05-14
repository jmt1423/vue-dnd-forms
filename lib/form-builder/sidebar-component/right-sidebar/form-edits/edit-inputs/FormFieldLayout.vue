<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../../utils/utils.ts'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
  :class="cn('flex flex-col gap-1', props.class)"
  >
    <slot />
  </div>
</template>

