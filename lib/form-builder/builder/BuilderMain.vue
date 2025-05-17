<script setup lang="ts">
import { Eye, X } from "lucide-vue-next";
import { ref } from "vue";
import { Toaster } from '../../ui/sonner'


import { Button } from "../../ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import AppSidebar from "../sidebar-component/left-sidebar/AppSidebar.vue";
import FormPreview from "./FormPreview.vue";
import SidebarRight from "../sidebar-component/right-sidebar/SidebarRight.vue";
import FormDropArea from "./FormDropArea.vue";
import AiPrompt from "./AiPrompt.vue";
import ThemeSwitcher from "../../ui/theme-switcher/ThemeSwitcher.vue";

const previewRef = ref<InstanceType<typeof FormPreview>>();
</script>

<template>
  <Toaster />
  <SidebarProvider>
    <AppSidebar />
    <SidebarTrigger class="max-md:hidden mt-4" />
    <SidebarProvider>
      <SidebarInset class="rounded-2xl m-3 shadow-[0_0_5px_rgba(0,0,0,0.15)] max-h-[calc(100vh-1.5rem)] overflow-scroll">
        <header
          class="sticky top-0 flex h-14 shrink-0 items-center rounded-2xl bg-white shadow-md z-[10] mb-3"
        >
          <div class="w-full flex justify-center items-center gap-3 rounded-lg">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    class="h-6 w-6 !p-3"
                  >
                    <X />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear form</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="outline"
                      size="icon"
                      @click="previewRef?.open()"
                      class="h-6 w-6 !p-3"
                    >
                      <Eye />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Preview Form</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <FormPreview ref="previewRef" data-cy="form-preview" />
              <AiPrompt />
              <ThemeSwitcher />
            </div>
        </header>
        <FormDropArea />
      </SidebarInset>
      <SidebarTrigger class="mt-4"/>
      <SidebarRight side="right" />
    </SidebarProvider>
  </SidebarProvider>
</template>
