<script setup lang="ts">
import { Eye } from 'lucide-vue-next'
import {provide, ref} from 'vue'

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '../../ui/breadcrumb'
import { Button } from "../../ui/button"
import { Separator } from '../../ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"
import type { FormKitSchemaFormKit } from '@formkit/core'
import AppSidebar from "../sidebar-component/AppSidebar.vue"
import FormPreview from "./FormPreview.vue"
import SidebarRightv2 from "../sidebar-component/SidebarRightv2.vue";
import FormDropArea from "./FormDropArea.vue";

const previewRef = ref<InstanceType<typeof FormPreview>>()
const fields = ref<FormKitSchemaFormKit[]>([])
const selectedIndex = ref(0)

provide('fields', fields)
provide('selectedIndex', selectedIndex)
</script>

<template>
  <SidebarProvider >
    <AppSidebar />
    <SidebarTrigger class="max-md:hidden mt-4"/>
    <SidebarProvider>
    <SidebarInset>
      <header class="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background/80 backdrop-blur-2xl">
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
        <FormPreview ref="previewRef" />
        <SidebarTrigger class="mr-1"/>
      </header>
      <FormDropArea
          v-model:modelValue="fields"
          v-model:selectedIndex="selectedIndex"
      />
    </SidebarInset>
      <SidebarRightv2 side="right"/>
    </SidebarProvider>
  </SidebarProvider>
</template>
