

describe('Page Object model', ()=>{
    let data;

    before(() =>{
        cy.fixture('datos').then(datosFixture => {
            data = datosFixture
        })
    })
})

beforeEach(() => {
    cy.visit("")
    cy.get('#registertoggle').dblclick();
    cy.get('#user').type(usuario.user)
    cy.get('#pass').type(usuario.pass)
    cy.get('#submitForm').click();
    cy.get('#todolistlink').click()
    cy.get('#removeAll').click();
})

it.only('Agregar una tare y validar el nombre y cantidad de tares que existen', () => {
    cy.get('#task').type('Hacer la cama')
    cy.get('#sendTask').click()
    cy.get('#task').type('Cocinar')
    cy.get('#task').type('Mirar la tele')
    cy.get('#sendTask').click()
})