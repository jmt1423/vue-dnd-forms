<script setup lang="ts">
import { Toaster } from '../../ui/sonner'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../ui/sidebar";

import AppSidebar from "../sidebar-component/left-sidebar/AppSidebar.vue";
import SidebarRight from "../sidebar-component/right-sidebar/SidebarRight.vue";
import FormDropArea from "./FormDropArea.vue";
import BuilderHeader from "./BuilderHeader.vue";
</script>

<template>
  <Toaster />
  <SidebarProvider>
    <AppSidebar />
    <div class="relative">
      <SidebarTrigger class="max-md:hidden absolute left-5 top-6 z-20 hover:text-white" />
    </div>
    <SidebarProvider>
      <SidebarInset class="sidebar-inset-curve rounded-2xl my-3 mr-2 max-h-[calc(100vh-1.5rem)] overflow-y-scroll z-0 border-1 border-ring/20">
        <BuilderHeader />
        <FormDropArea />
      </SidebarInset>
      <div class="relative">
        <SidebarTrigger class="absolute right-8 top-6 z-20 w-7 h-7 hover:text-white"/>
      </div>
      <SidebarRight side="right" />
    </SidebarProvider>
  </SidebarProvider>
</template>
