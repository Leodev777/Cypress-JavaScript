
// Todo esto es CSSelector - utilizamos el metodo GET
describe("Selectores con CSS Selectors", () => {

    it("selectores", () => {
        cy.visit('')
        cy.get('button'); // Elemento web unico encontrado
        cy.get('input') // Encontro 5 elementos web
        cy.get('[name="user"]') // Encontramos atributo unico del elemento
        cy.get('[id="day"]') // Encontramos con identificador unico
        cy.get('#day') // podemos tambien como identificador unico #

    })

    // Cypress tambien nos permite localizar rutas de otra formas como por ejemplo: 
    // .find nos permite econtrar un elemento web dentro de otro elemento web.

    it.only("Selectores.find", () => {
        cy.visit('')
        cy.get('fieldset')

    })
})
