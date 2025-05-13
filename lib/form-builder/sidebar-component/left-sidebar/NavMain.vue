<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../../ui/sidebar'
import { inject, computed, ref } from 'vue'
import { fieldProps } from '../../utils/field-props'
import { defaultFormElements } from '../../utils/field-props'
import { ScrollArea } from '../../../ui/scroll-area'

const searchInput = inject('searchInput', ref(''))

const filteredFormElements = computed(() => {
  if (!searchInput.value.trim()) {
    return defaultFormElements // Return all elements if the search is empty
  }

  const query = searchInput.value.toLowerCase()
  return defaultFormElements.filter(element =>
      element.name.toLowerCase().includes(query) ||
      element.description.toLowerCase().includes(query) ||
      element.$formkit.toLowerCase().includes(query)
  )
})

</script>

<template>
  <ScrollArea class="h-full">
    <SidebarGroup>
      <SidebarGroupLabel class="max-md:hidden">Form Inputs</SidebarGroupLabel>
      <SidebarMenu>
        <div
            v-for="item in filteredFormElements"
            :key="item.name"
        >
          <SidebarMenuItem :class="item.name.trim().replace(/\s+/g, '-').toLowerCase()">
              <SidebarMenuButton :tooltip="item.description" class="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
                <div class="w-full h-full flex flex-row items-center gap-3 p-3">
                  <component :is="fieldProps.find((prop) => prop.name === item.$formkit)?.icon" class="w-4 h-4" />
                  <div class="flex flex-col">
                    <span class="max-md:hidden !text-[11px] text-secondary-foreground/80" style="font-weight: bold">{{ item.name }}</span>
                    <span class="max-md:hidden  !text-[9px] text-muted-foreground">{{item.description}}</span>
                  </div>
                </div>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarMenu>
    </SidebarGroup>
  </ScrollArea>
</template>
