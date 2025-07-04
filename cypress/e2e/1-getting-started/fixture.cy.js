describe("hooks", () => {
    // Se ejecuta una vez antes de todos los tests, carga los datos del archivo fixture 'datos.json'
    before(() => {
        cy.fixture('datos').as('data'); // Guarda los datos del fixture en this.data para usarlos luego
    });

    // Se ejecuta antes de cada test
    beforeEach(function () {
        cy.visit(''); // Visita la URL base configurada en cypress.config.js

        cy.get('#registertoggle').dblclick(); // Hace doble click para mostrar el formulario de login

        cy.get('#user').type(this.data.usuario); // Escribe el usuario tomado del fixture
        cy.get('#pass').type(this.data.password); // Escribe la contraseña tomada del fixture
        cy.get("#submitForm").click(); // Hace click para enviar el formulario y loguearse

        cy.get('#todolistlink').click(); // Navega al enlace de la lista de tareas

        // Busca el botón con data-cy="removeAll" dentro del body para verificar si existe
        cy.get('body').then(($body) => {
            if ($body.find('[#removeAll"]').length) { // Si el botón existe en el DOM
                // Espera hasta 10 segundos a que el botón esté visible y luego hace click para eliminar todo
                cy.get('["#removeAll"]', { timeout: 10000 }).should('be.visible').click();
            } else {
                // Si no existe, muestra un mensaje en el log y continúa sin fallar el test
                cy.log('Botón removeAll no encontrado, se omite clic');
            }
        });
    });

    it.only('Primer test', function () {
        // Calcula el precio total sumando precio de producto1 y producto2 del fixtur
        this.data.productos.precioTotal =
            this.data.productos.producto1.precio + this.data.productos.producto2.precio;
        cy.log(`Precio total: ${this.data.productos.precioTotal}`); // Muestra el precio total en la consola de Cypress

        this.data.tareas.tarea4 = "Hacer la cama"; // Agrega una tarea extra directamente al objeto de tareas

        // Define un arreglo con las tareas a agregar en el test (3 del JSON + la extra)
        const tareas = [
            this.data.tareas.tarea1,
            this.data.tareas.tarea2,
            this.data.tareas.tarea3,
            this.data.tareas.tarea4
        ];

        // Recorre cada tarea, limpia el campo, escribe la tarea y hace click para agregarla
        tareas.forEach((tarea) => {
            cy.get('#task').clear().type(tarea);
            cy.get('#sendTask').click();
        });
    });

    it('Segundo test', function () {
        // Define las tareas originales a agregar desde el fixture
        const tareas = [
            this.data.tareas.tarea1,
            this.data.tareas.tarea2,
            this.data.tareas.tarea3
        ];

        // Por cada tarea limpia el input, escribe la tarea y la envía
        tareas.forEach((tarea) => {
            cy.get('#task').clear().type(tarea);
            cy.get('#sendTask').click();
        });
    });
});
