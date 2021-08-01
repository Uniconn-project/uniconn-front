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

    cy.get('h1').should('be.visible').should('contain', 'Criar conta')

    cy.get('input[placeholder="Nome"]').should('be.visible')
    cy.get('input[placeholder="Sobrenome"]').should('be.visible')
    cy.get('input[placeholder="Nome de usuário"]').should('be.visible')
    cy.get('input[placeholder="E-mail"]').should('be.visible')
    cy.get('input[type="date"]').should('be.visible')
    cy.get('input[placeholder="Senha"]').should('be.visible')
    cy.get('input[placeholder="Confirmar senha"]').should('be.visible')
    cy.get('[data-cy="is-attending-university-checkbox"]').should('be.visible')
    cy.get('[data-cy="university-select"]').should('exist')
    cy.get('[data-cy="major-select"]').should('exist')
    cy.get('[data-cy="skills-select"]').should('be.visible')

    cy.get('[data-cy="signup-submit-button"')
      .should('be.visible')
      .should('contain', 'Criar conta')
  })

  it('Asserting back arrow redirects to signup page', () => {
    cy.get('[data-cy="signup-form-back-arrow"]').click()
    cy.get('h1').should('contain', 'Uniconn')
  })

  it('Asserting error messages are properly displayed', () => {
    // making sure user can't submit an empty form
    cy.get('[data-cy="btn-submit-signup"').click()
    cy.get('.MuiAlert-standardError')
      .should('be.visible')
      .should('contain', 'Todos os campos devem ser preenchidos!')

    // testing passwords match error message
    fillForm()
    selectUniversityAndMajorAndSkills()
    cy.get('input[placeholder="Confirmar senha"]').type('dummy_passwordddddd')
    cy.get('[data-cy="btn-submit-signup"').click()
    cy.get('.MuiAlert-standardError')
      .should('be.visible')
      .should('contain', 'As senhas devem ser iguais!')

    // testing unavaiable username error message
    fillForm()
    cy.get('input[placeholder="Nome de usuário"]')
      .clear()
      .type(Cypress.env('test_user_username'))
    cy.get('[data-cy="btn-submit-signup"').click()
    cy.get('.MuiAlert-standardError')
      .should('be.visible')
      .should('contain', 'Nome de usuário já utilizado!')

    // testing unavaiable email error message
    fillForm()
    cy.get('input[placeholder="E-mail"]')
      .clear()
      .type(Cypress.env('test_user_email'))
    cy.get('[data-cy="btn-submit-signup"').click()
    cy.get('.MuiAlert-standardError')
      .should('be.visible')
      .should('contain', 'Email já utilizado!')
  })

  it('Asserting successful signup redirects to home page', () => {
    fillForm()
    selectUniversityAndMajorAndSkills()
    cy.get('[data-cy="btn-submit-signup"').click()
    cy.title().should('equal', 'Home | Uniconn')
  })
})

const fillForm = () => {
  cy.get('input[placeholder="Nome"]').clear().type('John')
  cy.get('input[placeholder="Sobrenome"]').clear().type('Fish')
  cy.get('input[placeholder="Nome de usuário"]').clear().type('jfish')
  cy.get('input[placeholder="E-mail"]').clear().type('johnfish1210@gmail.com')
  cy.get('input[type="date"]').clear().type('2001-10-12')
  cy.get('input[placeholder="Senha"]').clear().type('dummy_password')
  cy.get('input[placeholder="Confirmar senha"]').clear().type('dummy_password')
}

const selectUniversityAndMajorAndSkills = () => {
  cy.get('[data-cy="student-university-select"]').click()
  cy.get('ul.MuiMenu-list li').first().click()

  cy.get('[data-cy="student-major-select"]').click()
  cy.get('ul.MuiMenu-list li').first().click()

  cy.get('[data-cy="student-skills-select"]').click()
  cy.get('ul.MuiMenu-list li').first().click()
  cy.get('ul.MuiMenu-list li').last().click()
  cy.get('body').click()
}
