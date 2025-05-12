import '../../src/style.css'
import AppSidebar from "../../lib/form-builder/sidebar-component/left-sidebar/AppSidebar.vue";
import { SidebarProvider } from "../../lib/ui/sidebar";
import { h } from 'vue';

describe('<AppSidebar />', () => {
    beforeEach(() => {
        // run these tests as if in a desktop
        // browser with a 720p monitor
        cy.viewport(1280, 720)
    })

    const mountWithProvider = () => {
        // Create a wrapper component that includes both the provider and your target component
        const wrapper = {
            render() {
                return h(SidebarProvider, {}, {
                    default: () => h(AppSidebar)
                });
            }
        };
        
        return cy.mount(wrapper);
    };

    it('renders', () => {
        mountWithProvider();
    })

    it('renders key UI elements', () => {
        mountWithProvider();
        cy.contains('Single line text field')
        cy.contains('Multi-line text field')
        cy.contains('Email field input')
        cy.contains('Single number input')
        cy.contains('Telephone input field')
    })

    it('searches', () => {
        mountWithProvider();
        cy.get('input').should('be.visible')
        cy.get('input').type('text')
        cy.contains('Single line text field')
        cy.contains('Multi-line text field')
    })
})