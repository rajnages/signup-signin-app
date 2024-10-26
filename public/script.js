document.getElementById('signup-button').addEventListener('click', async function() {
  const username = document.querySelector('#signup-form input[placeholder="Username"]').value;
  const email = document.querySelector('#signup-form input[placeholder="Email"]').value;
  const password = document.querySelector('#signup-form input[placeholder="Password"]').value;

  const response = await fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });

  if (response.ok) {
    console.log('Signup successful');
    alert('Signup successful');
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    console.log('Signup form hidden, login form displayed');
  } else {
    console.log('Signup failed');
    alert('Signup failed');
  }
});

document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const username = document.querySelector('#login-form input[placeholder="Username"]').value;
  const password = document.querySelector('#login-form input[placeholder="Password"]').value;

  console.log(`Login attempt: ${username} / ${password}`);

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  const data = await response.text();
  console.log('Login response:', data);
  alert(`Login response: ${data}`);

  if (response.ok) {
    console.log('Redirecting to dashboard...');
    alert('Redirecting to dashboard...');
    localStorage.setItem('username', username);
    window.location.href = '/dashboard.html';
  } else {
    console.log('Login failed');
    alert('Invalid login');
  }
});
