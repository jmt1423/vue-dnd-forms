<script setup lang="ts">
import { Button } from "../components/ui/button";
import { ref } from "vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Eye, Trash2 } from "lucide-vue-next";
import FormPreview from "./FormPreview.vue";
import AiPrompt from "../components/ai-prompt/AiPrompt.vue";
import ThemeSwitcher from "../components/ui/theme-switcher/ThemeSwitcher.vue";
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
} from "../components/ui/alert-dialog";

const clearForm = () => {
  formSchema.value = [];
};
const previewRef = ref<InstanceType<typeof FormPreview>>();
</script>

<template>
  <header
    class="sticky top-0 md:top-5 flex h-14 shrink-0 items-center rounded-2xl z-[1000]"
  >
    <div class="w-full flex justify-center items-center gap-3 rounded-lg">
      <AlertDialog>
        <AlertDialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="secondary"
                  size="icon"
                  class="h-6 w-6 !p-3"
                >
                  <Trash2 class="dark:text-green-200"/>
                </Button>
              </TooltipTrigger>
              <TooltipContent class="bg-destructive dark:text-white">
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
              <Eye class="dark:text-green-200"/>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Preview Form</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <FormPreview ref="previewRef" />
      <AiPrompt />
      <ThemeSwitcher />
    </div>
  </header>
</template>
