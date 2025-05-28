// formkit.config.ts
import { rootClasses } from './formkit.theme.ts'
import { defaultConfig } from '@formkit/vue'


export default defaultConfig({
    config: {
        rootClasses,
    }
})