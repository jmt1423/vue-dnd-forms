<script setup lang="ts">
import { provideFormBuilderConfig } from "../composables/use-config";
import type { FormBuilderConfig } from "../types/env";

interface Props {
  config: FormBuilderConfig;
}

const props = defineProps<Props>();

provideFormBuilderConfig(props.config);
</script>

<template>
  <div class="form-builder-provider">
    <slot />
  </div>
</template>
