function init() {
    const mainDiv = document.getElementById('main');

    const header = document.createElement('header');
    const main = document.createElement('main');
    const footer = document.createElement('footer');

    mainDiv.appendChild(header);
    mainDiv.appendChild(main);
    mainDiv.appendChild(footer);

    const leftPanel = document.createElement('div');
    leftPanel.id = 'leftPanel';
    main.appendChild(leftPanel);

    const content = document.createElement('div');
    content.id = 'content';
    main.appendChild(content);

    const rightPanel = document.createElement('div');
    rightPanel.id = 'rightPanel';
    main.appendChild(rightPanel);

    [leftPanel, content, rightPanel].forEach(panel => {
        const loader = document.createElement('div');
        loader.className = 'loader';
        panel.appendChild(loader);
    });

    header.innerHTML = `
        <button onclick="showContent('User Rating')">User Rating</button>
        <button onclick="showContent('News')">News</button>
        <button onclick="showContent('Contacts')">Contacts</button>
        <button onclick="showContent('About')">About</button>
    `;

    footer.innerHTML = `
        <div>Current users: <span id="currentUsers">0</span></div>
        <div>New users: <span id="newUsers"></span></div>
    `;

    setTimeout(() => {
        document.querySelectorAll('.loader').forEach(loader => loader.style.display = 'none');
        content.innerHTML = '<p>No users</p><button onclick="getUsers()">Get Users</button>';
    }, 1000);

    setTimeout(() => {
        leftPanel.innerHTML += '<input type="text" id="searchInput"><button onclick="searchTable()">Search</button>';
    }, 1000);

    setTimeout(() => {
        rightPanel.innerHTML += '<p>Total Score: <span id="totalScore">0</span></p>';
        rightPanel.innerHTML += '<label><input type="checkbox" id="editTable" onchange="toggleEditMode()"> Edit table</label>';
    }, 1000);
}

function showContent(title) {
    const content = document.getElementById('content');
    content.innerHTML = `<h1>${title}</h1>`;
}

async function getUsers() {
    const content = document.getElementById('content');
    content.innerHTML = '<div class="loader"></div>';
    
    const users = await fetchUsers();
    content.innerHTML = '<table id="userTable"><thead><tr><th onclick="sortTable()">Lastname</th><th>Firstname</th><th>Score</th></tr></thead><tbody></tbody></table>';

    const tbody = document.querySelector('#userTable tbody');
    let totalScore = 0;

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${user.lastname}</td><td>${user.firstname}</td><td>${user.score}</td>`;
        tbody.appendChild(tr);
        totalScore += user.score;
    });

    document.getElementById('totalScore').innerText = totalScore;
}

function sortTable() {
    const table = document.getElementById('userTable');
    const rows = Array.from(table.rows).slice(1).sort((a, b) => a.cells[0].innerText.localeCompare(b.cells[0].innerText));
    table.tBodies[0].append(...rows);
}

function searchTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#userTable tbody tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? '' : 'none';
    });
}

function toggleEditMode() {
    const editMode = document.getElementById('editTable').checked;
    const rows = document.querySelectorAll('#userTable tbody tr');

    rows.forEach(row => {
        if (editMode) {
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.onclick = () => row.remove();
            row.appendChild(deleteBtn);
        } else {
            row.querySelector('button')?.remove();
        }
    });
}
