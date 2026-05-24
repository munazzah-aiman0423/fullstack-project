const API = 'http://localhost:5000/users';

async function fetchUsers() {
  const res = await fetch(API);
  const users = await res.json();

  const usersDiv = document.getElementById('users');
  usersDiv.innerHTML = '';

  users.forEach(user => {
    usersDiv.innerHTML += `
      <div class="user-card">
        <p>${user.name} - ${user.email}</p>
      </div>
    `;
  });
}

async function addUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email
    })
  });

  document.getElementById('name').value = '';
  document.getElementById('email').value = '';

  fetchUsers();
}

fetchUsers();