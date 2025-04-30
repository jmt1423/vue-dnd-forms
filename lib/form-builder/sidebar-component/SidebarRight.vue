<script setup lang="ts">
import {
  Sidebar,
  SidebarContent, SidebarFooter,
  SidebarHeader,
  type SidebarProps,
} from '../../ui/sidebar'
import FormEdit from "../builder/FormEdit.vue";
import DarkMode from "../builder/DarkMode.vue";


const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'none',
})
</script>

<template>
  <Sidebar
    class="sticky lg:flex top-0 h-svh border-l"
    v-bind="props"
  >
    <SidebarHeader class="h-8 border-b border-sidebar-border">
      <h2 class="text-xs md:text-sm font-medium text-foreground/90">Field Settings</h2>
    </SidebarHeader>
    <SidebarContent>
      <FormEdit />
    </SidebarContent>
    <SidebarFooter>
      <DarkMode />
    </SidebarFooter>
  </Sidebar>
</template>
