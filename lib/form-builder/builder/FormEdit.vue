<template>
  <div class="flex flex-col !h-fit">
    <ScrollArea class="h-full w-fit">
      <div class="p-2 md:p-3">
        <div
          v-if="!fields[selectedIndex]"
          class="flex items-center justify-center h-full text-[11px] md:text-xs lg:text-xs text-muted-foreground"
        >
          Select a field to edit its properties
        </div>
        <div v-if="fields[selectedIndex]" class="space-y-2 md:space-y-3">
          <div class="gap-1 pb-1 md:pb-2">
            <div class="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-transparent shadow-sm">
              <component
                :is="fieldProps.find((prop) => prop.name === fields[selectedIndex].$formkit)?.icon"
                class="!h-3 !w-3 md:h-4 md:w-4 text-primary"
              />
              <span
                class="text-xs md:text-xs lg:text-xs font-medium text-foreground/80 capitalize"
                >{{ fields[selectedIndex].$formkit }}</span
              >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp class="h-4 w-4 color-black muted rounded-full text-primary" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {{ fieldProps.find((prop) => prop.name === fields[selectedIndex].$formkit)?.tooltip }}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <EditTextField
            v-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'text'"
          />
          <EditEmailField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'email'"
          />
          <EditNumberField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'number'"
          />
          <EditCheckboxField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'checkbox'"
          />
          <EditTextAreaField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'textarea'"
          />
          <EditUrlField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'url'"
          />
          <EditDateField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'date'"
          />
          <EditTimeField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'time'"
          />
          <EditDateTimeField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'datetime-local'"
          />
          <EditFileField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'file'"
          />
          <EditRadioField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'radio'"
          />
          <EditRangeField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'range'"
          />
          <EditSelectField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'select'"
          />
          <EditTelephoneField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'tel'"
          />
          <EditPasswordField
            v-else-if="fields[selectedIndex] && fields[selectedIndex].$formkit === 'password'"
          />
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Ref } from 'vue'

import { CircleHelp } from 'lucide-vue-next'
import type { FormKitSchemaFormKit } from '@formkit/core'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip'
import { ScrollArea } from '../../ui/scroll-area'
import { fieldProps } from '../utils/field-props'

import EditTextField from '../edit-components/EditTextField.vue'
import EditEmailField from '../edit-components/EditEmailField.vue'
import EditNumberField from '../edit-components/EditNumberField.vue'
import EditCheckboxField from '../edit-components/EditCheckboxField.vue'
import EditTextAreaField from '../edit-components/EditTextAreaField.vue'
import EditUrlField from '../edit-components/EditUrlField.vue'
import EditDateField from '../edit-components/EditDateField.vue'
import EditTimeField from '../edit-components/EditTimeField.vue'
import EditDateTimeField from '../edit-components/EditDateTimeField.vue'
import EditFileField from '../edit-components/EditFileField.vue'
import EditRadioField from '../edit-components/EditRadioField.vue'
import EditRangeField from '../edit-components/EditRangeField.vue'
import EditSelectField from '../edit-components/EditSelectField.vue'
import EditTelephoneField from '../edit-components/EditTelephoneField.vue'
import EditPasswordField from '../edit-components/EditPasswordField.vue'

const selectedIndex = inject<Ref<number>>('selectedIndex', ref(0))
const fields = inject<Ref<FormKitSchemaFormKit[]>>('fields', ref([]))
</script>
