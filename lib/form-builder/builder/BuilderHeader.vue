<script setup lang="ts">
import { Button } from "../../ui/button";
import { ref } from "vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Eye, Trash2 } from "lucide-vue-next";
import FormPreview from "./FormPreview.vue";
import AiPrompt from "./AiPrompt.vue";
import ThemeSwitcher from "../../ui/theme-switcher/ThemeSwitcher.vue";
import { formSchema } from "../utils/default-form-elements";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";

const clearForm = () => {
  formSchema.value = [];
};

const previewRef = ref<InstanceType<typeof FormPreview>>();
</script>

<template>
  <header
    class="sticky top-0 flex h-14 shrink-0 items-center mr-5 rounded-2xl z-[10]"
  >
    <div class="w-full flex justify-center items-center gap-3 rounded-lg">
      <AlertDialog>
        <AlertDialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="secondary" size="icon" class="h-6 w-6 !p-3">
                  <Trash2 />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear form</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider></AlertDialogTrigger
        >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              form you have created.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" @click="clearForm"
              >Delete</AlertDialogAction
            >
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="secondary"
              size="icon"
              @click="previewRef?.open()"
              class="h-6 w-6 !p-3"
            >
              <Eye />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Preview Form</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <FormPreview ref="previewRef" data-cy="form-preview" />
      <AiPrompt />
      <ThemeSwitcher />
    </div>
  </header>
</template>
