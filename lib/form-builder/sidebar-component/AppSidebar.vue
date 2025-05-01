<script setup lang="ts">
import type { SidebarProps } from '../../ui/sidebar'
import {provide, ref} from 'vue'
import {SidebarInput} from "../../ui/sidebar";

import NavMain from './NavMain.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '../../ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'floating',
  collapsible: 'icon',
})

const searchInput = ref('')

provide("searchInput", searchInput)
</script>

<template>
  <Sidebar v-bind="props" class="max-h-[100%] sticky">
    <SidebarHeader>
      <SidebarInput placeholder="Search..." class="rounded-lg" v-model="searchInput" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain />
    </SidebarContent>
  </Sidebar>
</template>
