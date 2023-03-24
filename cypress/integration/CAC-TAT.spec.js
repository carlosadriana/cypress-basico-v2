/// <reference types="Cypress" />

const { should } = require("chai")

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')

    })
    it('verifica o titulo da aplicaçao', function() {
        cy.title('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatorios e envia o formulario', function() {
        const longText = "teste, teste, teste, teste,teste, teste, teste, teste,teste, teste, teste, teste"
        cy.get('#firstName').type('Antonio')
        cy.get('#lastName').type('Macedo')
        cy.get('#email').type('carlosadriana10@hotmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulario com um email com formataçao', function() {

        cy.get('#firstName').type('Antonio')
        cy.get('#lastName').type('Macedo')
        cy.get('#email').type('carlosadriana10@hotmail,com')
        cy.get('#open-text-area').type('Texto')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('campo telefoone continua vazio quando preenchido com valor não-numerico', function() {
        cy.get('#phone')
        .type('abcedf')
        .should('have.value', "")

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas nao prennsche', function () {
        cy.get('#firstName').type('Antonio')
        cy.get('#lastName').type('Macedo')
        cy.get('#email').type('carlosadriana10@hotmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Texto')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrennome, e telefone', function () {
        cy.get('#firstName')
        .type('Antonio')
        .should('have.value', 'Antonio')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Macedo')
        .should('have.value', 'Macedo')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('carlosadriana10@hotmail.com')
        .should('have.value', 'carlosadriana10@hotmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('123456789')
        .should('have.value', '123456789')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulario sem preeencher os campos obrigatorios', function() {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('enviar o formulario com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

    })
    it('seleciona um produto (youtube) por seu tesxto', function() {
        cy.get('#product')
        .select('youtube')
        .should('have.value','youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value','blog')

    })
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback')

    })
    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    it.only('marca ambos checkboxes, depois desmarca o último', function() {
     cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
            
            })
    
    })
        
})

