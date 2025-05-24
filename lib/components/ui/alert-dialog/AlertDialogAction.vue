<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { AlertDialogAction, type AlertDialogActionProps } from "reka-ui";
import { cn } from "../../../utils/utils.ts";
import { buttonVariants } from "../button";

type ButtonVariantType =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

const props = defineProps<
  AlertDialogActionProps & {
    class?: HTMLAttributes["class"];
    variant: ButtonVariantType;
  }
>();

const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <AlertDialogAction
    v-bind="delegatedProps"
    :class="cn(buttonVariants({ variant: props.variant }), props.class)"
  >
    <slot />
  </AlertDialogAction>
</template>
