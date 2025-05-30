import { inject, provide, type InjectionKey } from 'vue'
import type { FormBuilderConfig } from "../types/env";

export const CONFIG_KEY: InjectionKey<FormBuilderConfig> = Symbol('configKey')

export function provideFormBuilderConfig(config: FormBuilderConfig) {
  provide(CONFIG_KEY, config)
}

export function useFormBuilderConfig() {
  return inject(CONFIG_KEY, {})
}