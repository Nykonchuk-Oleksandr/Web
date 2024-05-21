// 1. Напишіть функцію invokeAfterDelay, яка повертає проміс, який викликає задану функцію із
// заданою затримкою. Продемонструйте її роботу, повертаючи проміс, що містить
// випадкове число від 0 до 10. Отриманий результат виведіть в консолі.

function invokeAfterDelay(delay, func) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(func()), delay);
    });
}

function getRandomNumber() {
    return Math.floor(Math.random() * 11);
}

async function executeDelayedFunction() {
    const delayedResult = await invokeAfterDelay(4000, getRandomNumber);
    console.log('Random Number:', delayedResult);
}

executeDelayedFunction();


// 2. Створивши на базі попередньої функції функцію produceRandomAfterDelay. Викличте
// функцію produceRandomAfterDelay двічі і надрукуйте суму, після того як будуть отримані
// обидва результати.

function invokeAfterDelay(delay, func) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(func()), delay);
    });
}

function getRandomNumber() {
    return Math.floor(Math.random() * 11);
}

async function executeDelayedFunction() {
    const delayedResult = await invokeAfterDelay(4000, getRandomNumber);
    console.log('Random Number:', delayedResult);
}

executeDelayedFunction();

// 3. Напишіть функцію sleep, яка повертає проміс, який можна викликати так:
// await sleep(1000)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function example() {
  console.log('Before');
  await sleep(2000);
  console.log('After 2 seconds');
}

example();

// 4. Напишіть функцію getUser яка приймає id та повертає проміс який виконується через 1
// секунду з обєктом користувача з полями імя, вік, місто, id. Підготуйте 4 обєкти користувача
// з id від 0 до 3 які повертатимуться функцією відповідно до id. Якщо незнайомий id
// отриманий – проміс має бути відхилений з помилкою ‘User not found’.

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [
                { id: 0, name: 'Sasha', age: 20, city: 'Rivne' },
                { id: 1, name: 'Tetiana', age: 25, city: 'Kyiv' },
                { id: 2, name: 'Dima', age: 35, city: 'Zhytomyr' },
                { id: 3, name: 'Petro', age: 28, city: 'Lutsk' }
            ];

            const user = users.find(user => user.id === id);

            if (user) {
                resolve(user);
            } else {
                reject('User not found');
            }
        }, 1000);
    });
}

getUser(2)
    .then(user => console.log(user))
   .catch(error => console.error(error));


// 5. Напишіть функцію loadUsers яка приймає масив ідентифікаторів та повертає масив обєктів
// користувача використовуючи попередню функцію. Обробіть ситуацію коли один з промісів
// був відхилений.

function fetchUserById(id) {
    return new Promise((resolve, reject) => {
      
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve({ id: id, name: `User${id}` });
            } else {
                reject(`Error fetching user with id ${id}`);
            }
        }, 1000);
    });
}

async function loadUsers(userIds) {
    const promises = userIds.map(id => fetchUserById(id));
    const results = await Promise.allSettled(promises);
    
    return results.map(result => {
        if (result.status === 'fulfilled') {
            return result.value;
        } else {
          
            return { error: result.reason };
        }
    });
}


const userIds = [1, 2, 3];
loadUsers(userIds)
    .then(users => console.log(users))
    .catch(error => console.error(error));

// 6. Напишіть функцію logCall яка приймає функцію коллбек – викликає її через одну секунду та
// пише в консоль поточний час. Зробіть щоб дана функція повертала проміс. Зробіть 4
// послідовних виклики даної функції використовуючи ланцюжок промісів.

function logCall(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const currentTime = new Date().toLocaleTimeString();
            console.log(`Current Time: ${currentTime}`);
            resolve(callback());
        }, 1000);
    });
}

function testFunc(){
    console.log("Test")
}
logCall(testFunc)
     .then(() => logCall(testFunc))
     .then(() => logCall(testFunc))
     .then(() => logCall(testFunc));

// 7. Напишіть функцію showUsers яка симулює завантаження користувачів використовуючи
// loadUsers. Перед викликом loadUsers дана функція має вивести в консоль ‘loading’ при при
// успішному чи неуспішному завершенні виведе ‘loading finished’. Використайте синтаксис
// async/await при виконанні даного завдання.

// Updated showUsers function with additional error handling

function fetchUserById(id) {
    return new Promise((resolve, reject) => {
       
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve({ id: id, name: `User${id}` });
            } else {
                reject(`Error fetching user with id ${id}`);
            }
        }, 1000);
    });
}

async function loadUsers(userIds) {
    const promises = userIds.map(id => fetchUserById(id));
    const results = await Promise.allSettled(promises);
    
    return results.map(result => {
        if (result.status === 'fulfilled') {
            return result.value;
        } else {
          
            return { error: result.reason };
        }
    });
}


const showUsers = async () => {
  console.log('loading');
  const userIds = [1, 2, 3]; 
  try {
    const result = await loadUsers(userIds);
    console.log(result);
    console.log('loading finished');
  } catch (error) {
    console.error('Error loading users:', error);
    console.log('loading finished');
  }
};


showUsers();
