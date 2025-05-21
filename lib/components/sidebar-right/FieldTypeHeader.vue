<!-- components/form/FieldTypeHeader.vue -->
<script setup lang="ts">
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/tooltip";
import {CircleHelp} from "lucide-vue-next";
import {fieldProps} from "../../utils/field-props.ts";

defineProps<{
  fieldType: string | null
}>()
</script>

<template>
  <div class="gap-1 pb-1 md:pb-2">
    <div class="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-transparent shadow-sm">
      <component
          :is="fieldProps.find((prop) => prop.name === fieldType)?.icon"
          class="!h-3 !w-3 md:h-4 md:w-4 text-primary"
      />
      <span class="text-xs md:text-xs lg:text-xs font-medium text-foreground/80 capitalize">
        {{ fieldType }}
      </span>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CircleHelp class="h-4 w-4 color-black muted rounded-full text-primary" />
          </TooltipTrigger>
          <TooltipContent>
            {{ fieldProps.find((prop) => prop.name === fieldType)?.tooltip }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>
