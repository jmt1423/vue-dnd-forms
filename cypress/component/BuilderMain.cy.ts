import '../../src/style.css'
import BuilderMain from '../../lib/form-builder/builder/BuilderMain.vue'

describe('<BuilderMain />', () => {
  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 720p monitor
    cy.viewport(1280, 720)
  })

  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(BuilderMain)
  })

  it('renders key UI elements', () => {
    cy.mount(BuilderMain)
    cy.get('[data-cy=builder-header]').should('be.visible').should('contain', 'Form Builder')
    cy.get('[data-cy=sidebar-left]').should('be.visible').should('contain', 'Single line text field')
    cy.get('[data-cy=sidebar-right]').should('be.visible').should('contain', 'Select a field to edit its properties')
    // cy.get('[data-cy=preview-button]').should('be.visible').should('contain', 'Preview')
  })
})