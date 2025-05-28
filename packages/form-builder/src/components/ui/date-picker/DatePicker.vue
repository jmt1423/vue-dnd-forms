<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { ref } from "vue";

import { cn } from "../../../utils/utils";
import { Button } from "../button";
import CalendarWithSelects from "./CalendarWithSelects.vue";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

const props = defineProps<{
  value?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function updateDate(newDate: any) {
  dateValue.value = newDate;
  emit("update:modelValue", newDate);
}

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const dateValue = ref<DateValue>();
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-full h-7 justify-start text-left font-normal bg-transparent hover:!bg-ring/10',
            !props.value && 'text-muted-foreground',
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{
          dateValue
            ? df.format(dateValue.toDate(getLocalTimeZone()))
            : "Pick a date"
        }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="mr-5 w-auto p-0 !bg-gradient-to-br from-secondary to-emerald-100 dark:from-sidebar-border dark:to-stone-900 dark:border-ring/5">
      <CalendarWithSelects
        :model-value="dateValue"
        initial-focus
        @update:model-value="updateDate"
      />
    </PopoverContent>
  </Popover>
</template>
