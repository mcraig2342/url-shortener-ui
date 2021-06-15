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
       .get('[data-cy=title-input]').type('text').should('be.visible')
       .get('[data-cy=url-input]').type('text').should('be.visible')

  })

});
