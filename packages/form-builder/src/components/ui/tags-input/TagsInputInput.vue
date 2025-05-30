<script setup lang="ts">
import { cn } from '../../../utils/utils'
import { TagsInputInput, type TagsInputInputProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes, reactive } from "vue";

const props = defineProps<TagsInputInputProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props

  return reactive(delegated)
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputInput v-bind="forwardedProps" :class="cn('text-sm min-h-5 focus:outline-none flex-1 bg-transparent px-1', props.class)" />
</template>
