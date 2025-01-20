import { supabase } from './supabaseClient.js';

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert('Error al iniciar sesión: ' + error.message);
  } else {
    alert('Inicio de sesión exitoso.');
  }
});
