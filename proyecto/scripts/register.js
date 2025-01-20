import { supabase } from './/supabaseClient.js';

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert('Error al registrarse: ' + error.message);
  } else {
    alert('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
  }
});
