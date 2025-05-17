<script setup lang="ts">
import { BotMessageSquare, SendHorizonal } from "lucide-vue-next";
import { Input } from "../../ui/input";
import OpenAI from "openai";
import instructions from "./Instructions.txt?raw";
import { Button } from "../../ui/button";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { formSchema } from "../utils/default-form-elements";
import type { FormKitSchemaFormKit } from "@formkit/core";
import { isLoading } from "../utils/composable";
import { cn } from "../utils/utils";

const inputRef = ref("");
const isFocusedVal = ref(false);

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
    console.log("Empty input");
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
    apiKey: import.meta.env.VITE_MY_OPEN_AI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    instructions,
    input: inputRef.value,
  });

  console.log(response.output_text);
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
    :class="
      cn(
        'flex rounded-lg max-md:w-[80%] !w-[50%] card relative bg-secondary items-center justify-center',
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
    <Input
      @focusin="isFocused"
      @focusout="isFocused"
      class="border-none shadow-none focus-visible:border-none focus-visible:ring-0"
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
</template>
