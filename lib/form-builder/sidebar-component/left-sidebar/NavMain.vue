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
import { formElements } from '../../utils/field-props'
import { ScrollArea } from '../../../ui/scroll-area'

const searchInput = inject('searchInput', ref(''))

const filteredFormElements = computed(() => {
  if (!searchInput.value.trim()) {
    return formElements // Return all elements if the search is empty
  }

  const query = searchInput.value.toLowerCase()
  return formElements.filter(element =>
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
          <SidebarMenuItem>
              <SidebarMenuButton :tooltip="item.description" class="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
                <component :is="fieldProps.find((prop) => prop.name === item.$formkit)?.icon" class="max-md:mt-3" />
                <div class="flex flex-col">
                  <span class="max-md:hidden !text-[11px] text-secondary-foreground/80" style="font-weight: bold">{{ item.name }}</span>
                  <span class="max-md:hidden  !text-[9px] text-muted-foreground">{{item.description}}</span>
                </div>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarMenu>
    </SidebarGroup>
  </ScrollArea>
</template>
