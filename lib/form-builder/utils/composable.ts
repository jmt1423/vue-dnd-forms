import type { Ref } from 'vue'
import { computed } from 'vue'
import type { FormKitSchemaFormKit } from '@formkit/core'
import { formSchema } from './default-form-elements.ts'
import type { WritableComputedRef } from 'vue'

export function useFormField(selectedField: Ref<FormKitSchemaFormKit | undefined>,
                           selectedIndex: Ref<number>,
                           fields?: Ref<FormKitSchemaFormKit[]>){


  const label = computed({
    get: () => selectedField.value?.label || '',
    set: (newLabel: string) => {
      if (formSchema.value.length > 0) {
        const updatedSchema = [...formSchema.value]
        updatedSchema[selectedIndex.value] = {
          ...updatedSchema[selectedIndex.value],
          label: newLabel,
        }
        formSchema.value = updatedSchema

        // Update fields as well if it exists
        if (fields) {
          fields.value = updatedSchema
        }
      }
    },
  })
  
  const placeholder = computed({
    get: () => selectedField.value?.placeholder || '',
    set: (newPlaceholder: string) => {
      if (formSchema.value.length > 0) {
        const updatedSchema = [...formSchema.value]
        updatedSchema[selectedIndex.value] = {
          ...updatedSchema[selectedIndex.value],
          placeholder: newPlaceholder,
        }
        formSchema.value = updatedSchema

        if (fields) {
          fields.value = updatedSchema
        }
      }
    }
  })

  const validationString = computed({
    get: () => selectedField.value?.validation || '',
    set: (value: string) => {
      if (formSchema.value.length > 0) {
        const updatedSchema = [...formSchema.value]
        updatedSchema[selectedIndex.value] = {
          ...updatedSchema[selectedIndex.value],
          validation: value,
        }
        formSchema.value = updatedSchema
        if (fields) {
          fields.value = updatedSchema
        }
      }
    }
  })

  const updateValidationString = (value: string) => {
    const currentValidation = validationString.value.split('|').filter(Boolean)
    let newValidation: string[]

    if(currentValidation.includes(value)) {
      newValidation = currentValidation.filter((item: string) => item !== value)
    } else {
      newValidation = [...currentValidation, value]
    }
    validationString.value = newValidation.join('|')
  }
  
  const help = computed({
    get: () => selectedField.value?.help || '',
    set: (newHelp: string) => {
      if (formSchema.value.length > 0) {
        const updatedSchema = [...formSchema.value]
        updatedSchema[selectedIndex.value] = {
          ...updatedSchema[selectedIndex.value],
          help: newHelp,
        }
        formSchema.value = updatedSchema

        // Update fields as well if it exists
        if (fields) {
          fields.value = updatedSchema
        }
      }
    },
  })

  const whichNumber: WritableComputedRef<any, string> = computed({
    get: () => selectedField.value?.number || 'integer',
    set: (value: string) => {
      if (value === 'integer') {
        if (formSchema.value.length > 0) {
          const updatedSchema = [...formSchema.value]
          updatedSchema[selectedIndex.value] = {
            ...updatedSchema[selectedIndex.value],
            number: value,
            step: '1',
          }
          formSchema.value = updatedSchema
          if (fields) {
            fields.value = updatedSchema
          }
        }
      } else {
        if (formSchema.value.length > 0) {
          const updatedSchema = [...formSchema.value]
          updatedSchema[selectedIndex.value] = {
            ...updatedSchema[selectedIndex.value],
            number: value,
            step: '0.1',
          }
          formSchema.value = updatedSchema
          if (fields) {
            fields.value = updatedSchema
          }
        }
      }
    },
  })

  const numOfFiles = computed({
    get: () => selectedField.value?.multiple || false,
    set: (value: boolean) => {
      if (formSchema.value.length > 0) {
        const updatedSchema = [...formSchema.value]
        updatedSchema[selectedIndex.value] = {
          ...updatedSchema[selectedIndex.value],
          multiple: value,
        }
        formSchema.value = updatedSchema
        if (fields) {
          fields.value = updatedSchema
        }
      }
    },
  })
  
  const modelValue: WritableComputedRef<any, string[]> = computed({
    get: () => selectedField.value?.options || [],
    set: (newOptions: string[]) => {
      if (formSchema.value.length > 0) {
        const updatedSchema = [...formSchema.value]
        updatedSchema[selectedIndex.value] = {
          ...updatedSchema[selectedIndex.value],
          options: newOptions,
        }
        formSchema.value = updatedSchema
        if (fields) {
          fields.value = updatedSchema
        }
      }
    },
  })
  
  const min: WritableComputedRef<any, number> = computed({
    get: () => selectedField.value?.min || 0,
    set: (newMin: number) => {
      if (formSchema.value.length > 0) {
        const updatedSchema = [...formSchema.value]
        updatedSchema[selectedIndex.value] = {
          ...updatedSchema[selectedIndex.value],
          min: newMin,
        }
        formSchema.value = updatedSchema

        if (fields) {
          fields.value = updatedSchema
        }
      }
    },
  })
  
  const max = computed({
    get: () => selectedField.value?.max || 10,
    set: (newMax: number) => {
      if (formSchema.value.length > 0) {
        const updatedSchema = [...formSchema.value]
        updatedSchema[selectedIndex.value] = {
          ...updatedSchema[selectedIndex.value],
          max: newMax,
        }
        formSchema.value = updatedSchema

        if (fields) {
          fields.value = updatedSchema
        }
      }
    },
  })

  return {
    label,
    placeholder,
    updateValidationString,
    help,
    whichNumber,
    numOfFiles,
    modelValue,
    min,
    max,
  }
}
