<script setup lang="ts">
import { ref, unref, provide } from 'vue'
import type { FormKitSchemaFormKit } from '@formkit/core'

import { FormKitSchema } from "@formkit/vue"
import { useDragAndDrop } from '@formkit/drag-and-drop/vue'
import { Eye, Trash2 } from 'lucide-vue-next'

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '../../ui/breadcrumb'
import { Button } from "../../ui/button"
import { Separator } from '../../ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../../ui/sidebar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"

import AppSidebar from "../sidebar-component/AppSidebar.vue"
import FormPreview from "./FormPreview.vue"
import SidebarRight from "../sidebar-component/SidebarRight.vue"
import { formElements, formSchema } from '../utils/form-elements'

const isSortable = ref(false)
const selectedIndex = ref(0)
const previewRef = ref()

const deleteField = (index: number) => {
  formSchema.value = formSchema.value.filter((_, i) => i !== index)
  fields.value = fields.value.filter((_, i) => i !== index)
}

const clickedField = (index: number) => {
  selectedIndex.value = index
  console.log('Selected index:', selectedIndex.value)
}

const [formFields, fields] = useDragAndDrop<FormKitSchemaFormKit>([], {
  group: 'form-builder',
  nativeDrag: true,
  draggingClass: 'opacity-50',
  sortable: isSortable.value,
  accepts: () => true,
  performTransfer: ({ currentParent, targetParent, draggedNodes }) => {
    if (targetParent === currentParent) {
      return
    }

    const targetValues = targetParent.data.getValues(targetParent.el) as FormKitSchemaFormKit[]

    const newValues = draggedNodes
        .map((node) => {
          if (!node.data?.value) return null
          const originalElement = formElements.find((el) => el.$formkit === node.data.value.$formkit)
          if (!originalElement) return null
          return JSON.parse(JSON.stringify(originalElement)) as FormKitSchemaFormKit
        })
        .filter((el): el is FormKitSchemaFormKit => el !== null)

    if (newValues.length > 0) {
      const updatedValues = [...targetValues, ...newValues]
      targetParent.data.setValues(updatedValues, targetParent.el)
      formSchema.value = updatedValues
    }
  },
  handleNodeDrop: (data) => {
    console.log('Dropped node:', data)
    console.log('Form schema in sorted:', fields.value)
  },
})

const moveField = (fromIndex: number, toIndex: number) => {
  const currentFields = unref(fields)
  if (toIndex < 0 || toIndex >= currentFields.length) return

  const updatedFields = [...currentFields]
  const [movedItem] = updatedFields.splice(fromIndex, 1)
  updatedFields.splice(toIndex, 0, movedItem)

  fields.value = updatedFields
  formSchema.value = updatedFields
}

provide('fields', fields)
provide('selectedIndex', selectedIndex)
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
        <div class="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger class="max-md:hidden"/>
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
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 items-center justify-center">
        <div class="mx-auto min-h-[85vh] p-4 h-fit w-[60%] max-w-3xl rounded-xl bg-primary/10 dark:bg-zinc-800 shadow-xl">
          <div ref="formFields" class="h-full space-y-1.5">
            <div v-for="(field, index) in fields" :key="field.$formkit" class="!mb-1">
              <div class="flex items-center gap-1.5">
                <div class="flex flex-col gap-1">
                  <Button
                      variant="outline"
                      size="icon"
                      class="h-5 w-5 md:h-6 md:w-6 text-[10px] md:text-xs"
                      :disabled="index === 0"
                      @click.stop="moveField(index, index - 1)"
                  >
                    ↑
                  </Button>
                  <Button
                      variant="outline"
                      size="icon"
                      class="h-5 w-5 md:h-6 md:w-6 text-[10px] md:text-xs"
                      :disabled="index === unref(fields).length - 1"
                      @click.stop="moveField(index, index + 1)"
                  >
                    ↓
                  </Button>
                </div>
                <div class="flex-1" @click="clickedField(index)">
                  <div
                      :class="[
                        'rounded transition-all duration-200 p-1',
                        selectedIndex === index
                          ? 'border border-primary/50 bg-primary/5'
                          : 'border border-transparent hover:border-border/20 hover:bg-primary/10',
                      ]"
                  >
                    <FormKitSchema :schema="[field]" :key="JSON.stringify(field)" />
                  </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    @click.stop="deleteField(index)"
                    class="h-4 w-4 md:h-5 md:w-5 text-[10px] md:text-xs hover:!bg-destructive/80"
                >
                  <Trash2 class="!h-3 !w-3 md:!h-3 md:!w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
    <SidebarRight />
  </SidebarProvider>
</template>
