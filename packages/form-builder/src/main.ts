import FormBuilder from "./builder/BuilderMain.vue"
import FormBuilderProvider from "./builder/FormBuilderProvider.vue";

export { useFormBuilderConfig, provideFormBuilderConfig } from "./composables/use-config"
export type { FormBuilderConfig } from "./types/env";

export { FormBuilder, FormBuilderProvider };