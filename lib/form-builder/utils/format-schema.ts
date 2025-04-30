import {computed, type Ref} from "vue";
import type {FormKitSchemaFormKit} from "@formkit/core";

export default function createFormattedSchema(fields: Ref<FormKitSchemaFormKit[]> | undefined) {
    return computed(() => {
        // Transform fields to remove unwanted elements and update IDs
        return fields?.value.map((field, index) => {
            const {
                $formkit,
                label,
                validation,
                help,
                placeholder,
                value,
                options,
                number,
                min,
                max,
                validationVisibility,
                __raw__sectionsSchema,
                step,
                multiple,
            } = field

            // Create a clean field object with only necessary properties
            const cleanField: FormKitSchemaFormKit = {
                $formkit,
                name: `${field.name}_${index}`,
                id: `preview_field_${index}`,
                label,
                validation,
                help,
                placeholder,
                value,
                options,
                number,
                min,
                max,
                validationVisibility,
                __raw__sectionsSchema,
                step,
                multiple,
            }

            // Add options if they exist (for select, radio, etc.)
            if (options) {
                cleanField.options = options
            }

            return cleanField
        })
    })
}