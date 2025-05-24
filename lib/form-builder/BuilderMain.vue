<script setup lang="ts">
import { Toaster } from "../components/ui/sonner";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

import SidebarLeft from "../components/sidebar-left/SidebarLeft.vue";
import SidebarRight from "../components/sidebar-right/SidebarRight.vue";
import FormDropArea from "./FormDropArea.vue";
import BuilderHeader from "./BuilderHeader.vue";
</script>

<template>
  <Toaster />
  <SidebarProvider>
    <SidebarLeft />
    <div class="relative">
      <SidebarTrigger
        class="max-md:hidden absolute left-5 top-6 z-20 hover:text-white"
      />
    </div>
    <SidebarProvider>
      <SidebarInset
        class="rounded-2xl my-3 mr-2 max-h-[calc(100vh-1.5rem)] overflow-y-scroll z-0 border-1 border-ring/20 dark:border-ring/5 relative bg-gradient-to-br from-secondary to-emerald-100 dark:from-sidebar-border dark:to-neutral-950"
      >
        <BuilderHeader />
        <FormDropArea />
      </SidebarInset>
      <div class="relative">
        <SidebarTrigger
          class="absolute right-8 top-6 z-20 w-7 h-7 hover:text-white"
        />
      </div>
      <SidebarRight side="right" />
    </SidebarProvider>
  </SidebarProvider>
</template>
