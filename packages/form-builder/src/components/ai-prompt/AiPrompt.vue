<script setup lang="ts">
import { useSidebar } from "../ui/sidebar";
import { BotMessageSquare, SendHorizonal } from "lucide-vue-next";
import OpenAI from "openai";
import instructions from "./Instructions.txt?raw";
import { Button } from "../ui/button";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { formSchema } from "../../utils/default-form-elements";
import type { FormKitSchemaFormKit } from "@formkit/core";
import { isLoading } from "../../composables/form-fields";
import { cn } from "../../utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useFormBuilderConfig } from "../../composables/use-config";

const { isMobile } = useSidebar();

const config = useFormBuilderConfig();
const inputRef = ref("");
const isFocusedVal = ref(false);
const isOpen = ref(false);

const parseFormSchema = (jsonString: string): FormKitSchemaFormKit[] => {
  try {
    // Parse JSON string into a JavaScript array
    return JSON.parse(jsonString) as FormKitSchemaFormKit[];
  } catch (error) {
    console.error("Error parsing form schema JSON:", error);
    return [];
  }
};

const handleClick = async () => {
  if (inputRef.value === "") {
    toast("Empty chat prompt!", {
      description: "Please enter a prompt to generate a form.",
      action: {
        label: "Close",
      },
    });
    return;
  }

  isLoading.value = true;
  const client = new OpenAI({
    apiKey: config.apiKey,
    dangerouslyAllowBrowser: true,
  });


  const defaultInstructions = "Generate a FormKit schema based on the user's description";

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    instructions: instructions || defaultInstructions,
    input: inputRef.value,
  });

  formSchema.value = parseFormSchema(
    response.output_text,
  ) as FormKitSchemaFormKit[];
  isLoading.value = false;
  inputRef.value = "";
};

const isFocused = () => {
  isFocusedVal.value = !isFocusedVal.value;
};
</script>

<template>
  <div
    v-if="!isMobile"
    :class="
      cn(
        'flex rounded-lg max-md:w-[80%] !w-[50%] card relative items-center justify-center',
        'bg-gradient-to-br from-secondary to-emerald-100 dark:from-sidebar-border dark:to-stone-900 dark:border-ring/5',
        isFocusedVal
          ? 'ring-2 ring-ring transition-all duration-300'
          : 'border border-ring/20 dark:border-ring/10 transition-all duration-300',
        isLoading
          ? 'bg-primary/5 shadow-inner animate-pulse transition-colors duration-300'
          : '',
      )
    "
  >
    <span class="start-0 inset-y-0 flex items-center justify-center px-2">
      <BotMessageSquare :class="cn('size-6 text-muted-foreground')" />
    </span>
    <Textarea
      @focusin="isFocused"
      @focusout="isFocused"
      class="border-none shadow-none focus-visible:border-none focus-visible:ring-0"
      placeholder="AI Assistant"
      v-model="inputRef"
    />
    <Button
      variant="ghost"
      class="hover:bg-green-500 dark:hover:bg-green-500 hover:text-white dark:hover:text-black w-7 h-7 mr-2"
      @click="handleClick()"
      :disabled="isLoading"
    >
      <SendHorizonal />
    </Button>
  </div>

  <Popover>
    <PopoverTrigger>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger v-if="isMobile">
            <Button
              id="form-dialog-portal"
              variant="secondary"
              size="icon"
              class="h-6 w-6 !p-3"
              @click="isOpen = !isOpen"
            >
              <BotMessageSquare />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>AI Assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </PopoverTrigger>
    <PopoverContent>
      <div
        :class="
          cn(
            'flex rounded-lg w-[50vw] card relative items-center justify-center',
            'bg-gradient-to-br from-secondary to-emerald-100 dark:from-zinc-800 dark:to-emerald-950',
            isFocusedVal ? 'border ring ring-ring' : 'border border-primary/10',
            isLoading
              ? 'bg-primary/5 shadow-inner animate-pulse transition-colors duration-300'
              : '',
          )
        "
      >
        <span class="start-0 inset-y-0 flex items-center justify-center px-2">
          <BotMessageSquare :class="cn('size-6 text-muted-foreground')" />
        </span>
        <Textarea
          @focusin="isFocused"
          @focusout="isFocused"
          class="border-none shadow-none focus-visible:border-none focus-visible:ring-0 h-fit"
          placeholder="Prompt AI"
          v-model="inputRef"
        />
        <Button
          variant="ghost"
          class="hover:bg-green-500 dark:hover:bg-green-500 hover:text-white dark:hover:text-black w-7 h-7 mr-2"
          @click="handleClick()"
          :disabled="isLoading"
        >
          <SendHorizonal />
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>
