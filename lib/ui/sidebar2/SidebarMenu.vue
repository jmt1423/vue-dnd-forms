<script setup lang="ts">
import {type HTMLAttributes, provide} from 'vue'
import { cn } from '../../lib/utils.ts'
import { useDragAndDrop } from '@formkit/drag-and-drop/vue'
import { formElements } from '../../form-builder/utils/form-elements.ts'
import type { FormKitSchemaFormKit } from '@formkit/core'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const [formEls, els] = useDragAndDrop(formElements, {
  group: 'form-builder',
  nativeDrag: true,
  draggingClass: 'opacity-50',
  sortable: false,
  accepts: () => false,
  performTransfer: ({ currentParent, targetParent, draggedNodes }) => {
    if (targetParent !== currentParent) {
      const targetValues = targetParent.data.getValues(targetParent.el) as FormKitSchemaFormKit[]
      const newValues = draggedNodes
          .map((node) => {
            const originalElement = formElements.find(
                (el) => el.$formkit === node.data.value.$formkit,
            )
            if (!originalElement) return null
            return { ...originalElement } as FormKitSchemaFormKit
          })
          .filter((el): el is FormKitSchemaFormKit => el !== null)
      targetParent.data.setValues([...targetValues, ...newValues], targetParent.el)
    }
  },
})

provide("formEls", els)
</script>

<template>
    <ul
        data-slot="sidebar-menu"
        ref="formEls"
        data-sidebar="menu"
        :class="cn('flex w-full min-w-0 flex-col gap-4', props.class)"
    >
      <slot />
    </ul>
</template>
