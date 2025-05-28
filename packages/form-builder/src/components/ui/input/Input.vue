<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../utils/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(
      'text-primary/90 file:text-foreground placeholder:text-muted-foreground/50 dark:placeholder:text-muted-foreground/30 selection:bg-ring/90 selection:text-primary-foreground dark:bg-input/30 border-ring/20 dark:border-ring/5 flex h-9 w-full min-w-0 !rounded-lg border bg-transparent px-3 py-1 !text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:!text-xs',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      props.class,
    )"
  >
</template>
