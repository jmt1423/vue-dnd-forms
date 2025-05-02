import { ref, readonly } from 'vue'
import type { FormKitSchemaFormKit } from "@formkit/core";

export function useForm() {
    const fields = ref<FormKitSchemaFormKit[]>([])
    const selectedIndex = ref(0)

    const setFields = (value: FormKitSchemaFormKit[]) => {
        fields.value = value
        console.log(fields.value)
    }

    const setSelectedIndex = (value: number) => {
        selectedIndex.value = value
    }

    return {
        fields: fields,
        selectedIndex: readonly(selectedIndex),
        setFields,
        setSelectedIndex,
    }
}