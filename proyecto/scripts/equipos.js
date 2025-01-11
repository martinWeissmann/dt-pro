// Referencias a los elementos
const teamForm = document.getElementById("team-form");
const teamNameInput = document.getElementById("team-name");
const teamCoachInput = document.getElementById("team-coach");
const teamCategorySelect = document.getElementById("team-category");
const teamList = document.getElementById("team-list");
const addTeamBtn = document.getElementById("add-team-btn");
const updateTeamBtn = document.getElementById("update-team-btn");

// Identificador del equipo que se está editando
let currentEditIndex = null;

// Cargar equipos al inicio
document.addEventListener("DOMContentLoaded", loadTeams);

// Manejar envío del formulario para agregar o actualizar
teamForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (currentEditIndex !== null) {
    updateTeam(currentEditIndex);
  } else {
    addTeam();
  }

  teamForm.reset();
  resetFormState();
  loadTeams();
});

// Guardar equipo en LocalStorage
function addTeam() {
  const teams = getTeams();
  const team = {
    name: teamNameInput.value,
    coach: teamCoachInput.value,
    category: teamCategorySelect.value,
  };
  teams.push(team);
  localStorage.setItem("teams", JSON.stringify(teams));
}

// Actualizar un equipo en LocalStorage
function updateTeam(index) {
  const teams = getTeams();
  teams[index] = {
    name: teamNameInput.value,
    coach: teamCoachInput.value,
    category: teamCategorySelect.value,
  };
  localStorage.setItem("teams", JSON.stringify(teams));
  currentEditIndex = null;
}

// Cargar y mostrar equipos
function loadTeams() {
  const teams = getTeams();

  // Limpiar lista existente
  teamList.innerHTML = "";

  // Generar elementos para cada equipo
  teams.forEach((team, index) => {
    const li = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = `${team.name} (Entrenador: ${team.coach}, Categoría: ${team.category})`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => editTeam(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", () => deleteTeam(index));

    li.appendChild(text);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    teamList.appendChild(li);
  });
}

// Obtener equipos de LocalStorage
function getTeams() {
  return JSON.parse(localStorage.getItem("teams")) || [];
}

// Editar un equipo
function editTeam(index) {
  const teams = getTeams();
  const team = teams[index];

  teamNameInput.value = team.name;
  teamCoachInput.value = team.coach;
  teamCategorySelect.value = team.category;

  currentEditIndex = index;

  addTeamBtn.classList.add("hidden");
  updateTeamBtn.classList.remove("hidden");
}

// Eliminar un equipo
function deleteTeam(index) {
  const teams = getTeams();
  teams.splice(index, 1);
  localStorage.setItem("teams", JSON.stringify(teams));
  loadTeams();
}

// Restablecer estado del formulario
function resetFormState() {
  addTeamBtn.classList.remove("hidden");
  updateTeamBtn.classList.add("hidden");
}
