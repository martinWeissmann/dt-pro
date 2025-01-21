document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.btn-add'); // Botón "Agregar Jugador"
    const tableBody = document.querySelector('table tbody'); // Cuerpo de la tabla
  
    // Cargar datos guardados al iniciar
    const loadPlayers = () => {
      const players = JSON.parse(localStorage.getItem('players')) || [];
      players.forEach((player, index) => addPlayerToTable(player.name, player.age, player.position, player.team, index + 1));
    };
  
    // Guardar datos en localStorage
    const savePlayers = () => {
      const players = Array.from(tableBody.children).map((row) => ({
        name: row.children[1].textContent,
        age: row.children[2].textContent,
        position: row.children[3].textContent,
        team: row.children[4].textContent,
      }));
      localStorage.setItem('players', JSON.stringify(players));
    };
  
    // Agregar un jugador a la tabla
    const addPlayerToTable = (name, age, position, team, number) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${number}</td>
        <td contenteditable="true">${name}</td>
        <td contenteditable="true">${age}</td>
        <td contenteditable="true">${position}</td>
        <td contenteditable="true">${team}</td>
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
  
    // Función para agregar un nuevo jugador
    const addPlayer = () => {
      const name = prompt('Ingrese el nombre del jugador:', 'Nuevo Jugador');
      const age = prompt('Ingrese la edad del jugador:', '18');
      const position = prompt('Ingrese la posición del jugador:', 'Posición');
      const team = prompt('Ingrese el equipo del jugador:', 'Equipo');
      if (name && age && position && team) {
        addPlayerToTable(name, age, position, team, tableBody.children.length + 1);
        savePlayers();
      }
    };
  
    // Función para eliminar un jugador
    const deletePlayer = (button) => {
      const row = button.closest('tr');
      row.remove();
  
      // Actualizar numeración de las filas
      Array.from(tableBody.children).forEach((row, index) => {
        row.firstElementChild.textContent = index + 1;
      });
      savePlayers();
    };
  
    // Función para editar un jugador
    const editPlayer = (button) => {
      const row = button.closest('tr');
      const name = row.children[1].textContent;
      const age = row.children[2].textContent;
      const position = row.children[3].textContent;
      const team = row.children[4].textContent;
  
      const newName = prompt('Ingrese el nuevo nombre del jugador:', name);
      const newAge = prompt('Ingrese la nueva edad del jugador:', age);
      const newPosition = prompt('Ingrese la nueva posición del jugador:', position);
      const newTeam = prompt('Ingrese el nuevo equipo del jugador:', team);
  
      if (newName && newAge && newPosition && newTeam) {
        row.children[1].textContent = newName;
        row.children[2].textContent = newAge;
        row.children[3].textContent = newPosition;
        row.children[4].textContent = newTeam;
        savePlayers();
      }
    };
  
    // Añadir evento de eliminación a un botón específico
    const addDeleteEvent = (button) => {
      button.addEventListener('click', () => deletePlayer(button));
    };
  
    // Añadir evento de edición a un botón específico
    const addEditEvent = (button) => {
      button.addEventListener('click', () => editPlayer(button));
    };
  
    // Añadir eventos a los botones ya existentes
    document.querySelectorAll('.btn-delete').forEach(addDeleteEvent);
    document.querySelectorAll('.btn-edit').forEach(addEditEvent);
  
    // Evento para agregar jugador
    addButton.addEventListener('click', addPlayer);
  
    // Cargar jugadores guardados al cargar la página
    loadPlayers();
  });
  