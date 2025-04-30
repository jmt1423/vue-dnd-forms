<script setup lang="ts">
import { cn } from '../../lib/utils'
import { TagsInputRoot, type TagsInputRootEmits, type TagsInputRootProps, useForwardPropsEmits } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<TagsInputRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<TagsInputRootEmits>()

const delegatedProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TagsInputRoot v-bind="forwarded" :class="cn('flex flex-wrap gap-2 items-center rounded-md border border-input bg-input/30 px-1 text-muted-foreground text-base text-xs min-h-7 placeholder:text-muted-foreground', props.class)">
    <slot />
  </TagsInputRoot>
</template>
