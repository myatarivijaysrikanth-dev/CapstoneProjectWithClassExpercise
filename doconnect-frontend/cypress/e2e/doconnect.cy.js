/// <reference types="cypress" />
describe('DoConnect E2E Tests', () => {

  describe('Register Page', () => {
    it('loads the register page', () => {
      cy.visit('http://localhost:3000/register')
      cy.contains('Register').should('be.visible')
    })

    it('shows error when all fields are empty', () => {
      cy.visit('http://localhost:3000/register')
      cy.contains('button','Register').click()
      cy.contains('All fields are required.').should('be.visible')
    })

    it('shows error when passwords do not match', () => {
      cy.visit('http://localhost:3000/register')
      cy.get('input[name="username"]').type('testuser')
      cy.get('input[name="email"]').type('test@test.com')
      cy.get('input[name="password"]').type('password123')
      cy.get('input[name="confirmPassword"]').type('different123')
      cy.contains('button','Register').click()
      cy.contains('Passwords do not match.').should('be.visible')
    })

    it('shows error for short username', () => {
      cy.visit('http://localhost:3000/register')
      cy.get('input[name="username"]').type('ab')
      cy.get('input[name="email"]').type('test@test.com')
      cy.get('input[name="password"]').type('password123')
      cy.get('input[name="confirmPassword"]').type('password123')
      cy.contains('button','Register').click()
      cy.contains('Username must be at least 3 characters.').should('be.visible')
    })
  })

  describe('Login Page', () => {
    it('loads the login page', () => {
      cy.visit('http://localhost:3000/login')
      cy.contains('Login').should('be.visible')
    })

    it('shows error when fields are empty', () => {
      cy.visit('http://localhost:3000/login')
      cy.contains('button','Login').click()
      cy.contains('All fields are required.').should('be.visible')
    })

    it('shows error for invalid email format', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('input[name="email"]').type('invalidemail')
      cy.get('input[name="password"]').type('password123')
      cy.contains('button','Login').click()
      cy.contains('Please enter a valid email address.').should('be.visible')
    })

    it('shows error for short password', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('input[name="email"]').type('test@test.com')
      cy.get('input[name="password"]').type('123')
      cy.contains('button','Login').click()
      cy.contains('Password must be at least 6 characters.').should('be.visible')
    })

    it('logs in successfully with valid credentials', () => {
      cy.visit('http://localhost:3000/login')
      cy.get('input[name="email"]').type('vijaynicky7@gmail.com')
      cy.get('input[name="password"]').type('Vicky@227')
      cy.contains('button','Login').click()
      cy.url().should('eq', 'http://localhost:3000/')
    })
  })

  describe('Home Page', () => {
    it('loads the home page', () => {
      cy.visit('http://localhost:3000')
      cy.contains('DoConnect').should('be.visible')
    })

    it('shows Latest Questions section', () => {
      cy.visit('http://localhost:3000')
      cy.contains('Latest Questions').should('be.visible')
    })

    it('shows login and register buttons when not logged in', () => {
      cy.visit('http://localhost:3000')
      cy.contains('Get Started').should('be.visible')
      cy.contains('Login').should('be.visible')
    })

    it('shows search bar in navbar', () => {
      cy.visit('http://localhost:3000')
      cy.get('input[type="search"]').should('be.visible')
    })
  })

  describe('Search Functionality', () => {
    it('navigates to search results page', () => {
      cy.visit('http://localhost:3000')
      cy.get('input[type="search"]').type('Node.js')
      cy.contains('button','Search').click()
      cy.url().should('include', '/search?keyword=Node.js')
    })

    it('shows Search Results heading', () => {
      cy.visit('http://localhost:3000/search?keyword=Node')
      cy.contains('Search Results').should('be.visible')
    })
  })

  describe('Protected Routes', () => {
    it('redirects /ask to login when not logged in', () => {
      cy.visit('http://localhost:3000/ask')
      cy.url().should('include', '/login')
    })

    it('redirects /chat to login when not logged in', () => {
      cy.visit('http://localhost:3000/chat')
      cy.url().should('include', '/login')
    })

    it('redirects /profile to login when not logged in', () => {
      cy.visit('http://localhost:3000/profile')
      cy.url().should('include', '/login')
    })

    it('redirects /admin to home when not logged in', () => {
      cy.visit('http://localhost:3000/admin')
      cy.url().should('eq', 'http://localhost:3000/')
    })
  })

  describe('Ask Question Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login')
      cy.get('input[name="email"]').type('vijaysrikanth237@gmail.com')
      cy.get('input[name="password"]').type('Vicky@227')
      cy.contains('button','Login').click()
      cy.url().should('eq', 'http://localhost:3000/')
    })

    it('loads ask question page', () => {
      cy.visit('http://localhost:3000/ask')
      cy.contains('Ask a Question').should('be.visible')
    })

    it('shows error when title is too short', () => {
      cy.visit('http://localhost:3000/ask')
      cy.get('input[name="title"]').type('Short')
      cy.get('textarea[name="description"]').type(
        'This is a valid description with enough characters to pass validation.'
      )
      cy.contains('button','Post Question').click()
      cy.contains('Title must be at least 10 characters.').should('be.visible')
    })

    it('shows error when description is too short', () => {
      cy.visit('http://localhost:3000/ask')
      cy.get('input[name="title"]').type('This is a valid question title here')
      cy.get('textarea[name="description"]').type('Too short')
      cy.contains('button','Post Question').click()
      cy.contains('Description must be at least 20 characters.').should('be.visible')
    })
  })

})