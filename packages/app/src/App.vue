<script setup lang="ts">
import {
  FormBuilder,
  BuilderProvider,
  type FormBuilderConfig,
} from "@vue-form-forge/form-builder/src/main.ts";
import { computed } from "vue";

const formBuilderConfig = computed<FormBuilderConfig>(() => ({
  apiKey: import.meta.env.VITE_MY_OPEN_AI_KEY,
}));
</script>

<template>
  <BuilderProvider :config="formBuilderConfig">
    <FormBuilder />
  </BuilderProvider>
</template>
