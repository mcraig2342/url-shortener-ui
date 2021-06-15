describe('URl shortening', () => {
  beforeEach(() => {
    cy.fixture('mock-data.json')
    .then(mockData => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
        statusCode: 201,
        delay: 100,
        body: mockData
      })
    })
    .visit('http://localhost:3000')
  });

  it('Should display page Title', () => {
    cy.get('[data-cy=page-title]').should('contain', 'URL Shortener')
  })

  it('Should display shortened urls', () => {
    cy.get('[data-cy=short-url]').should('contain', 'useshorturl')
      .get('[data-cy=short-url]').should('have.length', 2)
  })

  it('Should display form with proper inputs', () => {
     cy.get('[data-cy=form]>input').should('have.length', 2)
       .get('[data-cy=form]>button').should('have.length', 1)
       .get('[data-cy=title-input]').should('be.visible')
       .get('[data-cy=url-input]').should('be.visible')

  })

  it('Should display proper info in the input fields', () => {
     cy.get('[data-cy=title-input]').type('title').should('have.value', 'title')
       .get('[data-cy=url-input]').type('URl').should('have.value', 'URl');

  })

});

describe('Post request', () => {

  it('Should display new shortened link after submit', () => {

    cy.fixture('mock-data.json')
    .then(mockData => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
        statusCode: 201,
        delay: 100,
        body: mockData
      })
    })
    .visit('http://localhost:3000')
     cy.fixture('mock-data.json').then(data => {
       cy.intercept('POST', 'http://localhost:3001/api/v1/urls', data)
     })

     cy.get('[data-cy=title-input]').type('title')
       .get('[data-cy=url-input]').type('https://docs.cypress.io/api/commands/intercept#Syntax')
       .get('[data-cy=form]>button').click();
  })

  it('Should display new shortened link after submit no stub :(', () => {
     cy.get('[data-cy=title-input]').type('title')
       .get('[data-cy=url-input]').type('https://docs.cypress.io/api/commands/intercept#Syntax')
       .get('[data-cy=form]>button').click()
       .get('[data-cy=short-url]').eq(6).should('contain', 'http://localhost:3001/useshorturl/7')
  })


});
