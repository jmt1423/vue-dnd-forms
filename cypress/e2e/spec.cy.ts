import '../support/commands.ts'
import '@4tw/cypress-drag-drop'

describe('template spec', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('http://localhost:5173')
  })
  it('allows drag and drop of form elements', () => {
    cy.get('.email').drag('.form-drop-area-2')
    cy.get('.formkit-input').should('be.visible')
  })
})