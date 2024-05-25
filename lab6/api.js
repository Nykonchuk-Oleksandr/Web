const users = [
    { firstname: 'John', lastname: 'Doe', score: 10 },
    { firstname: 'Jane', lastname: 'Smith', score: 20 },
    { firstname: 'Alice', lastname: 'Johnson', score: 30 },
    { firstname: 'Bob', lastname: 'Brown', score: 40 },
    
];

async function fetchUsers() {
    return new Promise(resolve => {
        setTimeout(() => {
            const randomUsers = [];
            for (let i = 0; i < 10; i++) {
                randomUsers.push(users[Math.floor(Math.random() * users.length)]);
            }
            resolve(randomUsers);
        }, 1000);
    });
}

function getNewUsers() {
    return users.slice(0, 5);
}
