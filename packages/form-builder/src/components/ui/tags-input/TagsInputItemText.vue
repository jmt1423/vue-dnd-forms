<script setup lang="ts">
import { cn } from '../../../utils/utils'
import { TagsInputItemText, type TagsInputItemTextProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes, reactive } from "vue";

const props = defineProps<TagsInputItemTextProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props

  return reactive(delegated)
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItemText v-bind="forwardedProps" :class="cn('py-0.5 px-2 text-sm text-foreground/70 rounded bg-transparent', props.class)" />
</template>
