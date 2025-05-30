<!-- src/components/form-builder/BuilderPreview.vue -->
<template>
  <Dialog v-model:open="isOpen" class="form-preview">
    <DialogContent
      class="max-h-[90vh] overflow-y-auto sm:max-w-[500px] border-none"
      :show-overlay="true"
    >
      <DialogHeader class="pb-3 border-b border-border/50">
        <DialogTitle class="text-sm font-medium">Form Preview</DialogTitle>
        <DialogDescription class="text-[11px] text-muted-foreground">
          Preview your form and test its functionality.
        </DialogDescription>
      </DialogHeader>
      <div class="py-4 px-3">
        <FormKit
          type="form"
          :actions="false"
          v-model="data"
          @submit="handleSubmit"
          form-class="w-full !grid !grid-cols-2 gap-x-4"
        >
          <FormKitSchema :schema="formattedSchema" />
        </FormKit>
        <div class="mt-4 p-3 bg-muted/30 rounded border border-border/50">
          <h3 class="text-[11px] font-medium mb-2 text-foreground/80">
            Form Data:
          </h3>

          <pre class="text-[11px] text-muted-foreground">{{
            JSON.stringify(data, null, 2)
          }}</pre>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { formSchema } from "../utils/default-form-elements";
import createFormattedSchema from "../utils/format-schema";

const isOpen = ref(false);
const data = ref({});
const formattedSchema = createFormattedSchema(formSchema);

provide("isPreviewOpen", isOpen);

const handleSubmit = async (formData: Record<string, unknown>) => {
  console.log("Form submitted:", formData);
  await new Promise((r) => setTimeout(r, 1000));
  alert("Form submitted!");
  data.value = {};
};

const open = () => {
  isOpen.value = true;
  data.value = {};
};

const close = () => {
  isOpen.value = false;
  data.value = {};
};

defineExpose({
  open,
  close,
});
</script>
