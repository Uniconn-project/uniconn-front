/// <reference types="cypress" />

context('Login Page', () => {
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
    cy.get('button').contains('Entrar').click()
    cy.get('.MuiAlert-standardError')
      .should('be.visible')
      .should('contain', 'Todos os campos devem ser preenchidos!')

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
    cy.get('input[placeholder="Nome de usuário"]').type('john.doe')
    cy.get('input[placeholder="Senha"]').type('dummy_password')

    cy.get('button').contains('Entrar').click()
    cy.title().should('equal', 'Home | Uniconn')

    cy.get('[data-cy=header-profile-img]').click()
    cy.get('[data-cy=logout]').click()
    cy.on('window:confirm', () => true)
  })
})
