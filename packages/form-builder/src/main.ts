import FormBuilder from "./builder/BuilderMain.vue"
import BuilderProvider from "./builder/BuilderProvider.vue";

export { useFormBuilderConfig, provideFormBuilderConfig } from "./composables/use-config"
export type { FormBuilderConfig } from "./types/env";

export { FormBuilder, BuilderProvider };