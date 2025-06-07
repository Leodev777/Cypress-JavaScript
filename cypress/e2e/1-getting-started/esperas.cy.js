describe("hooks", () => {
    let data;

    before(() => {
        cy.fixture('datos').then(datosFixture => {
            data = datosFixture
        })
    });

    beforeEach(() => {
        cy.visit('')
        cy.get('#registertoggle').dblclick();
        cy.get('#user').type(Cypress.env().usuario)
        cy.get('#pass').type(Cypress.env().password)
        cy.get("#submitForm").click();
        cy.get('#todolistlink').click()
    });

    it('Validar timeouts con should', () => {
        cy.get('[data-cy="removeAll"]', { timeout: 60000 }).should('be.visible').click();
        cy.get('li', { timeout: 10000 }).should('not.exist')
        cy.get('#task').type('Hacer la cama')
        cy.get('#sendTask').click()
        cy.get('li', { timeout: 15000 }).first().find('p').should('have.length', 1).and('have.text', 'Hacer la cama');
        cy.get('li').find('p').invoke('text').should('have.length', 13)
        cy.get('li').find('p').click();
        cy.get('li').first().find('p', { timeout: 15000 }).should('have.attr', 'style', 'text-decoration: line-through;')

        cy.get('#completed').click();
        cy.get('li', { timeout: 15000 }).should('have.length', 1)
        cy.get('#active').click();
        cy.get('li', { timeout: 15000 }).should('not.exist')
    });

    it.only('Agregar una tarea y validar el nombre y cantidad de tareas existentes', () => {
        cy.get('[id="removeAll"]', { timeout: 60000 }).should('be.visible').click();
        cy.get('li', { timeout: 10000 }).should('not.exist')
        cy.get('#task').type('Hacer la cama')
        cy.get('#sendTask').click()
        // cy.get('li', { timeout: 15000 }).first().find('p', { timeout: 15000 }).and('have.text', 'Hacer las camas');
        cy.get('li', {timeout: 15000}).find('p', { timeout: 15000 }).invoke('text').then(text => {
            expect(text).to.be.equal('Hacer la cama');
        });
    });
});