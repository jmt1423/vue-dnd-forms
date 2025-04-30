<script setup lang="ts">
import type { SidebarProps } from './index'
import { cn } from '../../lib/utils'
import { useSidebar } from './utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  variant: 'sidebar',
  collapsible: 'offcanvas',
})

const { state } = useSidebar()
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    data-slot="sidebar"
    :class="cn(
    'bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col',
    'max-md:hidden',
    props.class
  )"
    v-bind="$attrs"
  >
    <slot />
  </div>

  <div
    v-else
    class="group peer text-sidebar-foreground block"
    data-slot="sidebar"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <!-- This is what handles the sidebar gap on desktop -->
    <div
      :class="cn(
        'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-in-out',
        'group-data-[collapsible=offcanvas]:w-0',
        'group-data-[side=right]:rotate-180',
        variant === 'floating' || variant === 'inset'
          ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
          : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        'max-md:!w-(--sidebar-width-icon)',
      )"
    />
    <div
      :class="cn(
        'fixed inset-y-0 z-10 flex h-svh transition-[width] duration-200 ease-in-out',
        // Width handling for desktop
        'w-(--sidebar-width)',
        // Always icon width on mobile
        'max-md:!w-(--sidebar-width-icon) max-md:data-[sidebar-collapsed=true]',
        // Positioning
        side === 'left'
          ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
          : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
        // Adjust the padding for floating and inset variants
        variant === 'floating' || variant === 'inset'
          ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
          : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
        props.class,
      )"
      v-bind="$attrs"
    >
      <div
        data-sidebar="sidebar"
        :class="cn(
          'bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:drop-shadow-lg group-data-[variant=floating]:drop-shadow-black/20',
          'max-md:items-center max-md:w-[3rem]'
        )"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
