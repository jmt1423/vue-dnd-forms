<script setup lang="ts">
import { SidebarHeader } from "../ui/sidebar";
import type { SidebarProps } from "../ui/sidebar";
import { Sidebar, SidebarContent } from "../ui/sidebar";
import FormEditMain from "./FormEditMain.vue";
import { fieldProps } from "../../utils/field-props.ts";
import {
  formSchema,
  selectedIndex,
} from "../../utils/default-form-elements.ts";
import { useFormField } from "../../utils/composable.ts";
import { computed } from "vue";

const selectedField = computed(() => formSchema.value[selectedIndex.value]);
const { currentFieldType } = useFormField(
  selectedField,
  selectedIndex,
  formSchema,
);

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "offcanvas",
  variant: "inset",
});
</script>

<template>
  <Sidebar v-bind="props" id="sidebar-right">
    <SidebarHeader>
      <div
        class="flex items-center w-fit gap-2 rounded-lg backdrop-blur-2xl"
      >
        <component
          :is="fieldProps.find((prop) => prop.name === currentFieldType)?.icon"
          class="!h-8 !w-8 rounded-md text-green-700 bg-ring/20 p-1.5"
        />
<!--        <span-->
<!--          class="text-sm font-medium text-green-800 capitalize tracking-wide"-->
<!--        >-->
<!--          {{ currentFieldType }}-->
<!--        </span>-->
      </div>
    </SidebarHeader>
    <SidebarContent>
      <FormEditMain />
    </SidebarContent>
  </Sidebar>
</template>
