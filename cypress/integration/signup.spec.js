/// <reference types="cypress" />

context('Signup Page', () => {
  before(() => {
    // making sure user isn't logged in
    cy.logout()
  })

  beforeEach(() => {
    cy.visit('/signup')
  })

  it('Asserting content was properly loaded', () => {
    cy.title().should('equal', 'Criar conta | Uniconn')

    cy.get('h1').should('be.visible').should('contain', 'Uniconn')

    cy.get('[data-cy=btn-signup-mentor]')
      .should('be.visible')
      .should('contain', 'Sou mentor')
    cy.get('[data-cy=btn-signup-student]')
      .should('be.visible')
      .should('contain', 'Sou aluno')

    cy.get('a').should('be.visible').should('contain', 'Já tem uma conta?')
  })

  it('Asserting mentor signup button redirects to mentor signup page', () => {
    cy.get('[data-cy=btn-signup-mentor]').click()
    cy.get('h1').should('contain', 'Mentor')
  })

  it('Asserting student signup button redirects to student signup page', () => {
    cy.get('[data-cy=btn-signup-student]').click()
    cy.get('h1').should('contain', 'Aluno')
  })

  it('Asserting login link redirects to login page', () => {
    cy.get('a').contains('Já tem uma conta?').click()
    cy.title().should('equal', 'Entrar | Uniconn')
  })
})
