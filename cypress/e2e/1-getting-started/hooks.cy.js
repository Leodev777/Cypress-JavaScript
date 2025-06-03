describe("hooks", () => { // Define una suite de pruebas llamada "hooks"
    let usuario = {} // Variable para guardar datos del usuario
    let tareas = {} // Variable para guardar las tareas que se usarán en los tests

    before(() => { // Hook que se ejecuta UNA vez antes de todos los tests
       usuario = {
        "user": "Leonardo", // Nombre de usuario para loguearse
        "pass": "Segur@2024" // Contraseña del usuario
       };
        cy.fixture('datos').then((data) => {
        tareas = data.tareas; // acá extraemos solo las tareas
    });
    
    });

    beforeEach(() => { // Hook que se ejecuta ANTES de CADA test
        cy.visit('') // Visita la URL base (debe estar definida en cypress.config.js)
        cy.get('#registertoggle').dblclick(); // Doble clic en el botón de registro (posiblemente para mostrar formulario de login)
        cy.get('#user').type(usuario.user) // Escribe el nombre de usuario en el campo con id="user"
        cy.get('#pass').type(usuario.pass) // Escribe la contraseña en el campo con id="pass"
        cy.get("#submitForm").click(); // Hace clic en el botón para iniciar sesión
        cy.get('#todolistlink').click() // Hace clic en el enlace para ir a la lista de tareas
        cy.wait(2000) // Espera 2 segundos para asegurar que todo cargue
        // cy.get('[data-cy="#removeAll"]').click(); // (Comentado) Podría usarse para eliminar todas las tareas antes de empezar
    })

    it('Primer test', () => { // Primer caso de prueba: agrega 3 tareas una por una
        cy.get('#task').wait(2000).type(tareas.tarea1) // Escribe la primera tarea
        cy.get('#sendTask').click() // Hace clic para agregar la tarea

        cy.get('#task').clear() // Limpia el campo
        cy.get('#task').wait(2000).type(tareas.tarea2) // Escribe la segunda tarea
        cy.get('#sendTask').click() // Hace clic para agregar la tarea

        cy.get('#task').clear() //  Limpia el campo
        cy.get('#task').wait(2000).type(tareas.tarea3) // Escribe la tercera tarea
        cy.get('#sendTask').click() // Hace clic para agregar la tarea
    })

    it('Segundo test', () => { // Segundo caso de prueba: repite el agregado de las mismas 3 tareas
        cy.get('#task').wait(2000).type(tareas.tarea1) // Escribe la primera tarea
        cy.get('#sendTask').click() // Hace clic para agregar la tarea

        cy.get('#task').clear() // Limpia el campo
        cy.get('#task').wait(2000).type(tareas.tarea2) // Escribe la segunda tarea
        cy.get('#sendTask').click() // Hace clic para agregar la tarea

        cy.get('#task').clear() // Limpia el campo
        cy.get('#task').wait(2000).type(tareas.tarea3) // Escribe la tercera tarea
        cy.get('#sendTask').click() // Hace clic para agregar la tarea
    })

    afterEach(() => { // Hook que se ejecuta DESPUÉS de cada test
        cy.wait(5000) // Espera 5 segundos (posiblemente para observar los resultados o permitir la carga)
    })

    after(() => { // Hook que se ejecuta UNA vez después de todos los tests
        cy.log('After') // Muestra un mensaje en la consola de Cypress
    })
})