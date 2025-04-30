<script setup lang="ts">
import type { SidebarProps } from '../../ui/sidebar'
import {provide, ref} from 'vue'

import NavMain from './NavMain.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '../../ui/sidebar'

import {Input} from "../../ui/input";

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'floating',
  collapsible: 'icon',
})

const searchInput = ref('')

provide("searchInput", searchInput)
</script>

<template>
  <Sidebar v-bind="props" class="relative max-h-[100%] sticky" >
    <SidebarHeader>
      <Input placeholder="Search..." class="h-7 !text-xs" v-model="searchInput" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain />
    </SidebarContent>
  </Sidebar>
</template>
