// Referencias a los formularios y elementos
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const message = document.getElementById("message");

// Mostrar formulario de registro
showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

// Mostrar formulario de inicio de sesión
showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// Registro de usuario
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  // Guardar en LocalStorage
  localStorage.setItem(email, password);
  message.textContent = "Registro exitoso. ¡Ahora puedes iniciar sesión!";
  registerForm.reset();
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// Inicio de sesión
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Verificar credenciales
  const storedPassword = localStorage.getItem(email);
  if (storedPassword === password) {
    message.textContent = "Inicio de sesión exitoso. ¡Bienvenido!";
  } else {
    message.textContent = "Correo o contraseña incorrectos.";
    message.style.color = "red";
  }
});
