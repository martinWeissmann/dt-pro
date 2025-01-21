// Conexión con Supabase
const supabaseUrl = 'https://imokfxicqzmedegxskxp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb2tmeGljcXptZWRlZ3hz' ;
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Manejar el formulario de inicio de sesión
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert('Error: ' + error.message);
  } else {
    alert('¡Inicio de sesión exitoso!');
    console.log(data);
  }
});

// Manejar el registro de usuario
const signupLink = document.getElementById('signup-link');
signupLink.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = prompt('Introduce tu correo electrónico:');
  const password = prompt('Introduce tu contraseña:');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert('Error: ' + error.message);
  } else {
    alert('¡Registro exitoso! Revisa tu correo para verificar tu cuenta.');
    console.log(data);
  }
});
