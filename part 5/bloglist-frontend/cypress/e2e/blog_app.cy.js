/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'super',
      username: 'root',
      password: 'admin'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('admin')
      cy.contains('login').click()
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('qwerty')
      cy.contains('login').click()

      cy.get('.red').should('contain', 'Wrong Credentials')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When Logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('root')
      cy.get('#password').type('admin')
      cy.contains('login').click()
    })

    it('A new blog can be created', function () {
      cy.contains('Add Blog').click()
      cy.get('.title').type('Sample Blog')
      cy.get('.author').type('Superman')
      cy.get('.url').type('google.com')
      cy.get('#blogSubmit').click()
      cy.get('.green').should('contain', 'Successfully')
    })
  })
})