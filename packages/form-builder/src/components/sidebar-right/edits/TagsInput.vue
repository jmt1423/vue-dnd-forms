<script setup lang="ts">
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "../../ui/tags-input";
import { Label } from "../../ui/label";
import EditsLayout from "./EditsLayout.vue";
import { computed, WritableComputedRef } from "vue";

const props = defineProps<{
  model: WritableComputedRef<any, string[]>;
  label: string;
  placeholder: string;
}>();

const modelValue = computed({
  get: () => props.model.value,
  set: (value: string[]) => {
    props.model.value = value;
  }
});
</script>

<template>
  <EditsLayout>
    <div>
      <Label
        for="selectTags"
        class="text-[11px] text-foreground/80 font-medium"
        >{{ props.label }}</Label
      >
    </div>
    <div>
      <TagsInput v-model="modelValue" id="selectTags">
        <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>

        <TagsInputInput :placeholder="props.placeholder" />
      </TagsInput>
    </div>
  </EditsLayout>
</template>
