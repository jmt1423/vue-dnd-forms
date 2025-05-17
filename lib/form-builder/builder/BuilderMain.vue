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
      <SidebarTrigger class="max-md:hidden absolute left-5 top-6 z-20" />
    </div>
    <SidebarProvider>
      <SidebarInset class="rounded-2xl my-3 mr-2 shadow-[0_0_5px_rgba(0,0,0,0.15)] max-h-[calc(100vh-1.5rem)] overflow-scroll">
        <BuilderHeader />
        <FormDropArea />
      </SidebarInset>
      <div class="relative">
        <SidebarTrigger class="absolute right-8 top-6 z-20 w-7 h-7"/>
      </div>
      <SidebarRight side="right" />
    </SidebarProvider>
  </SidebarProvider>
</template>