<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label class="text-[11px] font-medium tracking-wide text-foreground/80">Label</label>
      <Input
        v-model="label"
        placeholder="Enter label"
        class="h-7 rounded px-2 py-1 text-[10px]"
        style="font-size: 10px"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-[11px] font-medium tracking-wide text-foreground/80">Help Text</label>
      <Input
        v-model="help"
        placeholder="Enter help text"
        class="h-7 rounded px-2 py-1 text-[10px]"
        style="font-size: 10px"
      />
    </div>
    <div class="flex items-center gap-2">
      <ToggleGroup type="single" v-model="numOfFiles" variant="outline">
        <ToggleGroupItem value="false">Single</ToggleGroupItem>
        <ToggleGroupItem value="true">Multiple</ToggleGroupItem>
      </ToggleGroup>
    </div>
    <div class="flex items-center gap-2">
      <Checkbox
        :model-value="required"
        @update:model-value="handleChangeRequired()"
        id="isRequired"
        class="h-4 w-4 rounded border-border text-primary focus:ring-1 focus:ring-ring"
      />
      <label for="isRequired" class="text-[11px] font-medium tracking-wide text-foreground/80"
        >Required</label
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input } from '../../ui/input'
import {Checkbox} from '../../ui/checkbox'
import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group'
import { formSchema } from '../utils/form-elements'
import { inject } from 'vue'
import type { Ref } from 'vue'
import type { FormKitSchemaFormKit } from '@formkit/core'
import { useFormField } from '../utils/composable'

const required = ref(false)
const fields = inject<Ref<FormKitSchemaFormKit[]>>('fields')
const selectedIndex = inject<Ref<number>>('selectedIndex', ref(0))
const selectedField = computed(() => formSchema.value[selectedIndex.value])

// TODO: Fix remove all button

const { handleChangeRequired, label, help, numOfFiles } = useFormField(selectedField, selectedIndex, fields)
</script>
