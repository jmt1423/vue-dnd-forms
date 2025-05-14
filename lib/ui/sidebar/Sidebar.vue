<script setup lang="ts">
import type { SidebarProps } from './index'
import { cn } from '../../form-builder/utils/utils.ts'
import { useSidebar } from './utils'
import { Sheet, SheetContent } from '../sheet'
import SheetHeader from '../sheet/SheetHeader.vue'
import SheetTitle from '../sheet/SheetTitle.vue'
import SheetDescription from '../sheet/SheetDescription.vue'

const { state, isMobile, setOpenMobile, openMobile } = useSidebar()

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  variant: 'sidebar',
  collapsible: 'offcanvas',
})
</script>

<template>
  <div
      v-if="collapsible === 'none'"
      data-slot="sidebar"
      :class="cn(
    'bg-sidebar text-sidebar-foreground flex max-h-[100%] w-(--sidebar-width) flex-col',
    'max-md:hidden',
    props.class
  )"
      v-bind="$attrs"
  >
    <slot />
  </div>

  <Sheet
    v-else-if="side === 'right' && collapsible === 'offcanvas' && isMobile"
    :open="openMobile"
    @update:open="setOpenMobile"
  >
    <SheetContent
      data-sidebar="sidebar"
      data-slot="sidebar"
      :side="side"
      class="bg-sidebar text-sidebar-foreground max-w-(--sidebar-width) p-0 [&>button]:hidden"
    >
      <SheetHeader class="sr-only">
        <SheetTitle>Sidebar</SheetTitle>
        <SheetDescription>Controls the right sidebar.</SheetDescription>
      </SheetHeader>
      <div class="flex h-full w-full flex-col">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
      v-else
      class="group peer text-sidebar-foreground block max-md:w-14"
      data-slot="sidebar"
      :data-state="state"
      :data-collapsible="state === 'collapsed' ? collapsible : ''"
      :data-variant="variant"
      :data-side="side"
  >
    <div
        :class="cn(
        'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-in-out',
        'group-data-[collapsible=offcanvas]:w-0',
        'group-data-[side=right]:rotate-180',
        variant === 'floating' || variant === 'inset'
          ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
          : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
      )"
    />
    <div
        :class="cn(
        'fixed inset-y-0 z-10 flex h-svh transition-[width] duration-200 ease-in-out',
        'w-(--sidebar-width)',
        'max-md:max-w-[3.5rem]',
        side === 'left'
          ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
          : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
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
          'bg-sidebar flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:drop-shadow-lg group-data-[variant=floating]:drop-shadow-black/20',
          'max-md:items-center max-md:w-[3rem]'
        )"
      >
        <slot />
      </div>
    </div>
  </div>
</template>