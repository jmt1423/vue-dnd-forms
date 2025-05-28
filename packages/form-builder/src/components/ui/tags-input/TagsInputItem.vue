<script setup lang="ts">
import { cn } from '../../../utils/utils'
import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'reka-ui'

import { computed, type HTMLAttributes, reactive } from "vue";

const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props

  return reactive(delegated)
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItem v-bind="forwardedProps" :class="cn('flex h-5 items-center rounded-md bg-ring/30 data-[state=active]:ring-ring data-[state=active]:ring-2 data-[state=active]:ring-offset-2 ring-offset-background', props.class)">
    <slot />
  </TagsInputItem>
</template>
