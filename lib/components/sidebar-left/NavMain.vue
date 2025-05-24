<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'
import { inject, computed, ref } from 'vue'
import { fieldProps } from '../../utils/field-props.ts'
import { defaultFormElements } from '../../utils/field-props.ts'
import { ScrollArea } from '../ui/scroll-area'
import { useSidebar } from '../ui/sidebar'
import { cn } from '../../utils/utils.ts'

const { state } = useSidebar()

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
              <SidebarMenuButton
                  :tooltip="state === 'collapsed' ? item.description : ''"
                  class="relative flex items-center p-0 overflow-visible"
              >
                <div :class="cn('flex flex-row w-full h-fit items-center', state === 'collapsed' ? '' : 'p-2')">
                  <component
                      :is="fieldProps.find((prop) => prop.name === item.$formkit)?.icon"
                      class="h-4 w-4 shrink-0"
                  />
                  <div
                      class="ml-3 flex flex-col justify-center overflow-hidden max-md:hidden"
                      v-if="state !== 'collapsed'"
                  >
                    <span class="!text-[11px] text-secondary-foreground/80 font-medium">{{ item.name }}</span>
                    <span class="!text-[9px] text-muted-foreground truncate">{{ item.description }}</span>
                  </div>
                </div>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarMenu>
    </SidebarGroup>
  </ScrollArea>
</template>
