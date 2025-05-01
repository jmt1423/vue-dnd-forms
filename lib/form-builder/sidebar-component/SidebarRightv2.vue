<script setup lang="ts">
import {
  SidebarFooter, SidebarHeader,
} from '../../ui/sidebar'
import type { SidebarProps } from '../../ui/sidebar';
import {
  Sidebar,
  SidebarContent,
} from '../../ui/sidebar'
import ThemeSwitcher from "../builder/ThemeSwitcher.vue";
import FormEdit from "../builder/FormEdit.vue";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'offcanvas',
  variant: 'floating',
})

</script>

<template>
  <Sidebar
      v-bind="props"
      id="sidebar-right"
  >
    <SidebarHeader class="h-8 border-b border-sidebar-border">
      <h2 class="text-xs md:text-sm font-medium text-foreground/90">Field Settings</h2>
    </SidebarHeader>
    <SidebarContent>
      <FormEdit />
    </SidebarContent>
    <SidebarFooter>
      <ThemeSwitcher />
    </SidebarFooter>
  </Sidebar>
</template>

