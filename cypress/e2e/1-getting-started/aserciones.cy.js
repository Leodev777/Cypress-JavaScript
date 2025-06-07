describe("hooks", () => { // Grupo de pruebas con nombre 'hooks'
  let data; // Variable para almacenar datos del fixture

  before(() => { // Se ejecuta una vez antes de todos los tests
    cy.fixture('datos').then(datosFixture => { // Carga el archivo datos.json
      data = datosFixture; // Asigna el contenido del fixture a la variable global
    });
  });

  beforeEach(() => { // Se ejecuta antes de cada test individual
    cy.visit(''); // Abre la URL base definida en cypress.config.js
    cy.get('#registertoggle').dblclick(); // Doble clic para mostrar formulario de login
    cy.get('#user').type(Cypress.env().usuario); // Escribe el usuario desde variable de entorno
    cy.get('#pass').type(Cypress.env().password); // Escribe la contraseña desde variable de entorno
    cy.get("#submitForm").click(); // Hace clic en el botón para iniciar sesión
    cy.get('#todolistlink').click(); // Navega al módulo de "Todo List"
  });

  it('Agregar una tarea y validar el nombre y cantidad de tareas existentes', () => {
    cy.wait(6000); // Espera 6 segundos a que cargue la aplicación

    // Verifica si existe el botón 'removeAll' y hace clic para eliminar todas las tareas si existe
    cy.get('body').then($body => {
      if ($body.find('#removeAll').length) { // Si el botón existe
        cy.get('#removeAll').click(); // Lo clickea
        cy.wait(6000); // Espera a que se eliminen las tareas
      }
    });

    cy.get('li').should('not.exist'); // Verifica que no existan tareas en la lista

    cy.get('#task').wait(2000).type('Hacer la cama'); // Escribe "Hacer la cama" en el input de tareas
    cy.get('#sendTask').click(); // Hace clic en el botón para agregar la tarea
    cy.wait(6000); // Espera a que se agregue visualmente la tarea

    // Verifica que el primer <li> contenga un solo <p> con el texto correcto
    cy.get('li').first().find('p')
      .should('have.length', 1) // Debe haber solo un <p>
      .and('have.text', 'Hacer la cama'); // Y debe tener el texto exacto

    // Verifica que el texto completo del <p> tenga 13 caracteres
    cy.get('li').find('p').invoke('text')
      .should('have.length', 13); // "Hacer la cama" tiene 13 letras

    // Clic en el <p> para marcar la tarea como completada (aplica tachado)
    cy.get('li').first().find('p').click();

    cy.wait(6000); // Espera a que se aplique el estilo

    // Verifica que el estilo del <p> sea "text-decoration: line-through;"
    cy.get('li').first().find('p')
      .should('have.attr', 'style', 'text-decoration: line-through;');

    cy.get('#completed').click(); // Filtra por tareas completadas
    cy.wait(6000); // Espera a que se actualice el filtro
    cy.get('li').should('have.length', 1); // Verifica que haya una tarea completada

    cy.get('#active').click(); // Filtra por tareas activas (no completadas)
    cy.wait(6000); // Espera a que se actualice el filtro
    cy.get('li').should('not.exist'); // Verifica que no haya tareas activas
  });
});
