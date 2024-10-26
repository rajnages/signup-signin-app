document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  if (!username) {
    console.log('Redirecting to login...');
    window.location.href = '/';
  } else {
    console.log('Welcome,', username);
    document.getElementById('username').textContent = username;
  }
});
