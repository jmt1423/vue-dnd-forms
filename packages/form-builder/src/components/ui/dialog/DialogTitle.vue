<script setup lang="ts">
import { cn } from '../../../utils/utils'
import { DialogTitle, type DialogTitleProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes, reactive } from "vue";

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return reactive(delegated)
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    v-bind="forwardedProps"
    :class="cn('text-lg leading-none font-semibold', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
