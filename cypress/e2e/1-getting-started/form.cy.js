describe('Form', () => {

    const nombreAleatorio = Math.floor(Math.random() * 1000)  // Crea un número aleatorio entre 0 y 999 para que el nombre no se repita

    it('Form', () => {

        cy.visit('');  // Abre la página que se va a probar (URL a completar)
        cy.get('#user').type(`Leonardo${nombreAleatorio}`)  // Escribe "Leonardo" más un número aleatorio en el campo de usuario
        cy.get('#pass').type('Segur@2024')  // Escribe la contraseña en el campo correspondiente
        cy.get('[value="Male"]').check({ force: true })  // Marca la opción "Masculino", forzando el clic si está oculta
        cy.get('#day').select('12')  // Selecciona el día 12 en el campo de día
        cy.get('#month').select('October')  // Selecciona el mes de octubre
        cy.get('#year').select('1950')  // Selecciona el año 1950
        cy.get('#submitForm').click();  // Hace clic en el botón para enviar el formulario
        cy.get('#todolistlink').click()
        cy.get("[id^='sen']").type("Creamos tarea 1")
        cy.get('#sendTask').click()
        cy.contains('Creamos tarea 1').click()

    })

    // it('', ()=> {

        
   // })

})
