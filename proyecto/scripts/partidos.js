document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.btn-add'); // Botón "Agregar Partido"
    const tableBody = document.querySelector('table tbody'); // Cuerpo de la tabla
    
    // Cargar partidos guardados al iniciar
    const loadMatches = () => {
        const matches = JSON.parse(localStorage.getItem('matches')) || [];
        matches.forEach((match, index) => addMatchToTable(match.date, match.localTeam, match.visitorTeam, match.result, index + 1));
    };

    // Guardar partidos en localStorage
    const saveMatches = () => {
        const matches = Array.from(tableBody.children).map((row) => ({
            date: row.children[1].textContent,
            localTeam: row.children[2].textContent,
            visitorTeam: row.children[3].textContent,
            result: row.children[4].textContent,
        }));
        localStorage.setItem('matches', JSON.stringify(matches));
    };

    // Agregar un partido a la tabla
    const addMatchToTable = (date, localTeam, visitorTeam, result, number) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${number}</td>
            <td contenteditable="true">${date}</td>
            <td contenteditable="true">${localTeam}</td>
            <td contenteditable="true">${visitorTeam}</td>
            <td contenteditable="true">${result}</td>
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

    // Función para agregar un nuevo partido
    const addMatch = () => {
        const date = prompt('Ingrese la fecha del partido:', 'DD/MM/YYYY');
        const localTeam = prompt('Ingrese el nombre del equipo local:', 'Equipo Local');
        const visitorTeam = prompt('Ingrese el nombre del equipo visitante:', 'Equipo Visitante');
        const result = prompt('Ingrese el resultado del partido:', '0 - 0');
        if (date && localTeam && visitorTeam && result) {
            addMatchToTable(date, localTeam, visitorTeam, result, tableBody.children.length + 1);
            saveMatches();
        }
    };

    // Función para eliminar un partido
    const deleteMatch = (button) => {
        const row = button.closest('tr');
        row.remove();
    
        // Actualizar numeración de las filas
        Array.from(tableBody.children).forEach((row, index) => {
            row.firstElementChild.textContent = index + 1;
        });
        saveMatches();
    };

    // Función para editar un partido
    const editMatch = (button) => {
        const row = button.closest('tr');
        const date = row.children[1].textContent;
        const localTeam = row.children[2].textContent;
        const visitorTeam = row.children[3].textContent;
        const result = row.children[4].textContent;
    
        const newDate = prompt('Ingrese la nueva fecha del partido:', date);
        const newLocalTeam = prompt('Ingrese el nuevo equipo local:', localTeam);
        const newVisitorTeam = prompt('Ingrese el nuevo equipo visitante:', visitorTeam);
        const newResult = prompt('Ingrese el nuevo resultado del partido:', result);
    
        if (newDate && newLocalTeam && newVisitorTeam && newResult) {
            row.children[1].textContent = newDate;
            row.children[2].textContent = newLocalTeam;
            row.children[3].textContent = newVisitorTeam;
            row.children[4].textContent = newResult;
            saveMatches();
        }
    };

    // Añadir evento de eliminación a un botón específico
    const addDeleteEvent = (button) => {
        button.addEventListener('click', () => deleteMatch(button));
    };

    // Añadir evento de edición a un botón específico
    const addEditEvent = (button) => {
        button.addEventListener('click', () => editMatch(button));
    };

    // Añadir eventos a los botones ya existentes
    document.querySelectorAll('.btn-delete').forEach(addDeleteEvent);
    document.querySelectorAll('.btn-edit').forEach(addEditEvent);

    // Evento para agregar partido
    addButton.addEventListener('click', addMatch);

    // Cargar partidos guardados al cargar la página
    loadMatches();
});
