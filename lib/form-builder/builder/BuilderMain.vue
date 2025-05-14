<script setup lang="ts">
import { Eye } from 'lucide-vue-next'
import {ref} from 'vue'

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '../../ui/breadcrumb'
import { Button } from "../../ui/button"
import { Separator } from '../../ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"
import AppSidebar from "../sidebar-component/left-sidebar/AppSidebar.vue"
import FormPreview from "./FormPreview.vue"
import SidebarRight from "../sidebar-component/right-sidebar/SidebarRight.vue";
import FormDropArea from "./FormDropArea.vue";

const previewRef = ref<InstanceType<typeof FormPreview>>()
</script>

<template>
  <SidebarProvider >
    <AppSidebar />
    <SidebarTrigger class="max-md:hidden mt-4"/>
    <SidebarProvider>
    <SidebarInset>
      <header
          data-cy="builder-header"
          class="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background/80 backdrop-blur-2xl">
        <div class="flex flex-1 items-center gap-2 px-3">
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage class="line-clamp-1">
                  Form Builder
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div class="pr-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon" @click="previewRef?.open()" class="h-6 w-6 !p-3">
                  <Eye />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <FormPreview ref="previewRef" data-cy="form-preview"/>
        <SidebarTrigger class="mr-1"/>
      </header>
      <FormDropArea />
    </SidebarInset>
      <SidebarRight side="right" />
    </SidebarProvider>
  </SidebarProvider>
</template>
