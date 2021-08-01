/// <reference types="cypress" />

context('Login Page', () => {
  before(() => {
    // making sure user isn't logged in
    cy.logout()
  })

  beforeEach(() => {
    cy.visit('/login')
  })

  it('Asserting content was properly loaded', () => {
    cy.title().should('equal', 'Entrar | Uniconn')

    cy.get('h1').should('be.visible').should('contain', 'Entrar na Uniconn')

    cy.get('input[placeholder="Nome de usuário"]').should('be.visible')
    cy.get('input[placeholder="Senha"]').should('be.visible')

    cy.get('button').should('be.visible').should('contain', 'Entrar')
    cy.get('a')
      .should('be.visible')
      .should('contain', 'Inscrever-se na Uniconn')
  })

  it('Asserting error messages are properly displayed', () => {
    // making sure user can't submit an empty form
    cy.get('button').contains('Entrar').click()
    cy.get('.MuiAlert-standardError')
      .should('be.visible')
      .should('contain', 'Todos os campos devem ser preenchidos!')

    // ----------
    cy.get('input[placeholder="Nome de usuário"]').type('abcdefghijkl')
    cy.get('input[placeholder="Senha"]').type('lkjihgfedcba')

    cy.get('button').contains('Entrar').click()
    cy.get('.MuiAlert-standardError')
      .should('be.visible')
      .should('contain', 'Credenciais inválidas!')
  })

  it('Asserting signup link redirects to signup page', () => {
    cy.get('a').contains('Inscrever-se na Uniconn').click()
    cy.title().should('equal', 'Criar conta | Uniconn')
  })

  it('Asserting successful login redirects to home page', () => {
    cy.get('input[placeholder="Nome de usuário"]').type(
      Cypress.env('test_user_username')
    )
    cy.get('input[placeholder="Senha"]').type(Cypress.env('test_user_password'))

    cy.get('button').contains('Entrar').click()
    cy.title().should('equal', 'Projetos | Uniconn')
  })
})
