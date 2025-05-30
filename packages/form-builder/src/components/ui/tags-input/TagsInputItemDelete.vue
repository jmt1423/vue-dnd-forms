<script setup lang="ts">
import { cn } from '../../../utils/utils'
import { X } from 'lucide-vue-next'
import { TagsInputItemDelete, type TagsInputItemDeleteProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes, reactive } from "vue";

const props = defineProps<TagsInputItemDeleteProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props

  return reactive(delegated)
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItemDelete v-bind="forwardedProps" :class="cn('flex rounded bg-transparent mr-1 cursor-pointer hover:text-destructive', props.class)">
    <slot>
      <X class="w-4 h-4" />
    </slot>
  </TagsInputItemDelete>
</template>
