describe('Esperas Waits', () => { // Describe el conjunto de pruebas relacionadas con "Esperas"
    const timeout = 10000; // Define un tiempo de espera reutilizable de 10 segundos

    beforeEach("Prcondiciones", () => { // Ejecuta estas acciones antes de cada test
        cy.visit(''); // Visita la URL base definida en la configuración de Cypress
        cy.get("#registertoggle").dblclick() // Hace doble clic en el botón que alterna el formulario de registro/login
        cy.get('#user').type('Leonardo747') // Escribe "Leonardo747" en el campo de usuario
        cy.get('#pass').type('Segur@2024!') // Escribe la contraseña en el campo de contraseña
        cy.get('#submitForm').click() // Hace clic en el botón para enviar el formulario
        cy.get(`[id*='user_leonardo747']`).should('exist') // Verifica que exista un elemento con ID que contenga "user_leonardo747"
        cy.get('#waitslink').click() // Hace clic en el enlace que lleva a la sección de esperas
        cy.get('button#wait').dblclick() // Hace doble clic en el botón con ID "wait"
    })

    it("Deberia validad la primera espera", () => { // Define un caso de prueba
        // Verificar que el boton 'cargando' su texto vuelva a ser 'button'. ('have.text')
        cy.get('button#wait').should('have.text', 'Cargando'); // Verifica que el texto inicial del botón sea "Cargando"
        cy.get('button#wait', { timeout: 10000 }).should('have.text', 'Button'); // Espera hasta 10 segundos a que el texto del botón cambie a "Button"
    })

    it("Deberia validad la primera espera", () => { // Define otro caso de prueba
        // verificar que exista un elemento cuyo texto sea 'Wait 5 more seconds' ('have.text')
        cy.get('[data-cy="colorChangeMessage"]', { timeout: 20000 }).should('have.text', 'Wait 5 more seconds') // Espera hasta 20 segundos a que el mensaje con ese texto aparezca
    })

    it.only("Deberia validad la primera espera", () => { // Define un tercer caso de prueba, marcado como "only" para ejecutar solo este
        cy.get('[id="message"]', { timeout: 10000 }).should('have.text', 'You have waited for ten seconds, CONGRATULATIONS'); // Espera hasta 10 segundos a que el mensaje sea el texto esperado
        cy.get('[id="message"]', { timeout: 5000 }) // Espera hasta 5 segundos
          .should('not.to.have.text', 'You have waited for ten seconds, CONGRATULATIONS') // Verifica que el texto ya no sea el anterior
          .invoke('text') // Obtiene el texto del elemento
          .then(text => { // Luego, ejecuta una función con el texto obtenido
            expect(text).to.be.equal('You are a man of patience and have waited fifteen seconds') // Verifica que el nuevo texto sea el esperado después de 15 segundos
        });
    });
});
