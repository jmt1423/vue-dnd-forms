\<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../utils/utils.ts'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    :class="cn('group/menu-item relative', props.class)"
    draggable="true"
  >
    <slot />
  </li>
</template>
