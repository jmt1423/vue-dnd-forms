<script setup lang="ts">
import { SidebarHeader } from "../ui/sidebar";
import type { SidebarProps } from "../ui/sidebar";
import { Sidebar, SidebarContent } from "../ui/sidebar";
import FormEditMain from "./FormEditMain.vue";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "offcanvas",
  variant: "inset",
});
</script>

<template>
  <Sidebar v-bind="props" id="sidebar-right">
    <SidebarHeader class="h-8 border-b border-sidebar-border">
      <h2 class="text-xs md:text-sm font-medium text-foreground/90">
        Field Settings
      </h2>
    </SidebarHeader>
    <SidebarContent>
      <FormEditMain />
    </SidebarContent>
  </Sidebar>
</template>
