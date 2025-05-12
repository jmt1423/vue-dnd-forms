import { mount } from 'cypress/vue'

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1]

declare global {
    namespace Cypress {
        interface Chainable {
            mount(component: any, options?: OptionsParam): Chainable<any>
        }
    }
}

Cypress.Commands.add('mount', (component, options: OptionsParam = {}) => {
    // Setup options object
    options.global = options.global || {}
    options.global.stubs = options.global.stubs || {}
    options.global.stubs['transition'] = false
    options.global.components = options.global.components || {}
    options.global.plugins = options.global.plugins || []

    return mount(component, options)
})