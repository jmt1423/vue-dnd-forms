<script setup lang="ts">
import { cn } from "../../../../../utils/utils";
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import ValidationLayout from "../ValidationLayout.vue";
import { Switch } from "../../../../../../ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../../../ui/tooltip";
import { CircleHelp } from "lucide-vue-next";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  isActive?: boolean;
  label?: string;
  showSwitch?: boolean;
  tooltip?: string;
}>();

const emit = defineEmits<{
  "update:isActive": [value: boolean];
}>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

function updateValue(value: boolean) {
  emit("update:isActive", value);
}
</script>

<template>
  <ValidationLayout
    v-bind="delegatedProps"
    :class="cn('flex-row items-center gap-2 p-2 rounded-lg', props.class)"
  >
    <div class="flex flex-col gap-1">
      <div class="flex flex-row gap-2">
        <Switch :model-value="isActive" @update:model-value="updateValue" />
        <span class="text-xs">{{ label }}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleHelp class="h-4 w-4 muted rounded-full text-ring" />
            </TooltipTrigger>
            <TooltipContent>
              {{ tooltip }}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <slot />
    </div>
  </ValidationLayout>
</template>
