<script setup>
import { SidebarProvider } from "../../../lib/ui/sidebar/index.js";
import AppSidebar from "../../../lib/form-builder/sidebar-component/left-sidebar/AppSidebar.vue";
</script>

<template>
  <SidebarProvider>
    <AppSidebar
      side="left"
      variant="sidebar"
      collapsible="offcanvas"
    />
  </SidebarProvider>
</template>