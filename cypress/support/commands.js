Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

    cy.get('#firstName').type('Antonio')
    cy.get('#lastName').type('Macedo')
    cy.get('#email').type('carlosadriana10@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()


})