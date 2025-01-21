document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.querySelector('.btn-add'); // Botón "Agregar Equipo"
  const tableBody = document.querySelector('table tbody'); // Cuerpo de la tabla

  // Cargar datos guardados al iniciar
  const loadTeams = () => {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    teams.forEach((team, index) => addTeamToTable(team.name, team.city, index + 1));
  };

  // Guardar datos en localStorage
  const saveTeams = () => {
    const teams = Array.from(tableBody.children).map((row) => ({
      name: row.children[1].textContent,
      city: row.children[2].textContent,
    }));
    localStorage.setItem('teams', JSON.stringify(teams));
  };

  // Agregar un equipo a la tabla
  const addTeamToTable = (name, city, number) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${number}</td>
      <td contenteditable="true">${name}</td>
      <td contenteditable="true">${city}</td>
      <td>
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(newRow);

    // Añadir eventos a los botones
    addDeleteEvent(newRow.querySelector('.btn-delete'));
    addEditEvent(newRow.querySelector('.btn-edit'));
  };

  // Función para agregar un nuevo equipo
  const addTeam = () => {
    const name = prompt('Ingrese el nombre del equipo:', 'Nuevo Equipo');
    const city = prompt('Ingrese la ciudad del equipo:', 'Ciudad');
    if (name && city) {
      addTeamToTable(name, city, tableBody.children.length + 1);
      saveTeams();
    }
  };

  // Función para eliminar un equipo
  const deleteTeam = (button) => {
    const row = button.closest('tr');
    row.remove();

    // Actualizar numeración de las filas
    Array.from(tableBody.children).forEach((row, index) => {
      row.firstElementChild.textContent = index + 1;
    });
    saveTeams();
  };

  // Función para editar un equipo
  const editTeam = (button) => {
    const row = button.closest('tr');
    const name = row.children[1].textContent;
    const city = row.children[2].textContent;

    const newName = prompt('Ingrese el nuevo nombre del equipo:', name);
    const newCity = prompt('Ingrese la nueva ciudad del equipo:', city);

    if (newName && newCity) {
      row.children[1].textContent = newName;
      row.children[2].textContent = newCity;
      saveTeams();
    }
  };

  // Añadir evento de eliminación a un botón específico
  const addDeleteEvent = (button) => {
    button.addEventListener('click', () => deleteTeam(button));
  };

  // Añadir evento de edición a un botón específico
  const addEditEvent = (button) => {
    button.addEventListener('click', () => editTeam(button));
  };

  // Añadir eventos a los botones ya existentes
  document.querySelectorAll('.btn-delete').forEach(addDeleteEvent);
  document.querySelectorAll('.btn-edit').forEach(addEditEvent);

  // Evento para agregar equipo
  addButton.addEventListener('click', addTeam);

  // Cargar equipos guardados al cargar la página
  loadTeams();
});
