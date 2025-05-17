<script setup lang="ts">
import { cn } from '../../form-builder/utils/utils'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <div
    data-slot="label"
    v-bind="delegatedProps"
    :class="
      cn(
        'absolute inset-0 flex items-center justify-center bg-transparent rounded-xl backdrop-blur-xs',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>