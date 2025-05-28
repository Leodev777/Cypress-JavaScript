
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

    it("Selectores.find", () => {
        cy.visit('')
        cy.get('fieldset')
        cy.contains('Register')
        // cy.contains('Register1')
        
    })

    // Localizando elementos por .contains nos permite encontrar elementos web atravez de su texto visible
    // Ej cy.contains('Register') ... 

    it('Elementos web utilizando contains', () => {
        cy.visit('')
        cy.contains('button','Register');
        // cy.contains('')
        // Metodo para relacionar elementos web, lo mas usados: .children / .parent / .siblings
        cy.contains('Hacer las comptras') // cy.contains['Hacer las compras'].sibbling('button').click() 

    })
})
