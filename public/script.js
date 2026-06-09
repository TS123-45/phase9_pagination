let currentPage = 1;

async function loadUsers(page) {
  const response = await fetch(`/api/users?page=${page}`);

  const result = await response.json();

  const users = result.data;

  const list = document.getElementById("userList");

  list.innerHTML = "";

  users.forEach((user) => {
    list.innerHTML += `
      <li>${user.id} - ${user.name}</li>
    `;
  });

  document.getElementById("pageNumber").textContent = result.currentPage;
}

function nextPage() {
  currentPage++;

  loadUsers(currentPage);
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;

    loadUsers(currentPage);
  }
}

loadUsers(currentPage);
