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

});
