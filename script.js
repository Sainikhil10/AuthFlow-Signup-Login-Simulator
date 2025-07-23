const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const toLoginLink = document.getElementById('to-login');
const toSignupLink = document.getElementById('to-signup');
const message = document.getElementById('message');
const formContainer = document.getElementById('form-container');

function getUsers() {
  return JSON.parse(localStorage.getItem('authflowUsers') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('authflowUsers', JSON.stringify(users));
}

// Switch forms
toLoginLink.addEventListener('click', e => {
  e.preventDefault();
  signupForm.style.display = 'none';
  loginForm.style.display = 'flex';
  message.textContent = '';
});

toSignupLink.addEventListener('click', e => {
  e.preventDefault();
  loginForm.style.display = 'none';
  signupForm.style.display = 'flex';
  message.textContent = '';
});

// Signup
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!username || !password) {
    message.style.color = 'red';
    message.textContent = 'Please fill all fields.';
    return;
  }

  const users = getUsers();
  if (users.some(u => u.username === username)) {
    message.style.color = 'red';
    message.textContent = 'Username already exists.';
    return;
  }

  users.push({ username, password });
  saveUsers(users);

  message.style.color = 'green';
  message.textContent = 'Signup successful! You can now login.';
  signupForm.reset();
});

// Login
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    message.style.color = 'green';
    message.textContent = `Welcome back, ${username}!`;
    loginForm.reset();
  } else {
    message.style.color = 'red';
    message.textContent = 'Invalid username or password.';
  }
});
