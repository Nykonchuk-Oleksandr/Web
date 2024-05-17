// 1. Створіть функцію average, яка знаходить середнє значення із довільного числа аргументів,
// використайте spread … оператор.
function average(...args) {
    let sum = 0;
    for (let num of args) {
        sum += num;
    }
    return sum / args.length;
}

console.log(average(2, 4, 6, 8)); 

// 2. Створіть функцію values(f, low, high), яка повертає масив значень [f(low), f(low + 1), ...,
//     f(high)].
function values(f, low, high) {
    let result = [];
    for (let i = low; i <= high; i++) {
        result.push(f(i));
    }
    return result;
}


function square(x) {
    return x * x;
}

let squaredValues = values(square, 1, 5);
console.log(squaredValues); 


// 3. Своріть функцію callWithContext як приймає обєкт та функцію коллбек яка викликається з
// контекстом пережаного обєкта. Викличте цю функцію з обєктом person з полями імя та вік
// та функцією яка виведе в консоль ‘Today is ${date }! Happy birthday ${name}.

function callWithContext(obj, callback) {
  callback.call({ ...obj });
}
let myFunc = function(){
    console.log(`Today is ${this.date}! Happy birthday ${this.name}`);
}
callWithContext({name: "Sasha", date: "16.09"}, myFunc);


// 4. Створіть функцію, яка повертає об’єкт з двома методами: increment і getValue. Метод
// increment має збільшувати значення, яке зберігається в замиканні, а метод getValue має
// повертати поточне значення. 

function createCounter() {
    let value = 0;

    return {
        increment: function() {
            value++;
        },
        getValue: function() {
            return value;
        }
    };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getValue()); 

// 5. Створіть функцію getGreeting яка приймає імя та повертає текстовий фрагмент типу ‘Hello
// name’. Зробіть щоб функція зберігала значення останнього виклику та якщо аикликана
// знову з таким же аргументом – повертала кешовне значення.

function getGreeting() {
    let lastCalled = '';
    let lastGreeting = '';

    return function(name) {
        if (name === lastCalled) {
            return lastGreeting;
        } else {
            lastCalled = name;
            lastGreeting = `Привіт, ${name}!`;
            return lastGreeting;
        }
    };
}

const greet = getGreeting();

console.log(greet('Олена')); 
console.log(greet('Іван')); 
console.log(greet('Олена')); 

// 6. Створіть функцію, яка приймає число як аргумент і повертає функцію, яка приймає інше
// число як аргумент і повертає суму двох чисел. Перевірте функцію, викликавши її з різними
// номерами.

function createAdder(num1) {
    return function(num2) {
        return num1 + num2;
    };
}

const addFive = createAdder(5);
console.log(addFive(3)); 

const addTen = createAdder(10);
console.log(addTen(5)); 

// 7. Створіть функцію, яка приймає масив текстових фрагментів як аргумент і повертає нову
// функцію, яка приймає текстовий фрагмент як аргумент і повертає логічне значення, яке
// вказує, чи існує текстовий фрагмент у вихідному масиві. 

function createChecker(array) {
    return function(fragment) {
        return array.includes(fragment);
    };
}

const fragments = ["apple", "banana", "cherry"];
const checkFragment = createChecker(fragments);

console.log(checkFragment("banana")); 
console.log(checkFragment("orange"));

// 8. Створіть функцію, яка приймає масив об’єктів як аргумент і повертає новий масив об’єктів,
// де певна властивість написана з великої літери. Використовуйте стрілочну функцію.

const capitalizeProperty = (array, property) => {
    return array.map(obj => ({
        ...obj,
        [property]: obj[property].charAt(0).toUpperCase() + obj[property].slice(1)
    }));
};

const objects = [
    { name: "apple", color: "red" },
    { name: "banana", color: "yellow" },
    { name: "cherry", color: "red" }
];

const newObjects = capitalizeProperty(objects, 'name');

console.log(newObjects);

// 9. Напишіть приклад для демонстрації функцій call, apply, bind.

const personWithAge = {
    firstName: "Sasha",
    lastName: "Nykonchuk",
    age: 20,
    fullNameWithAge: function(greeting) {
        return `${greeting}, my name is ${this.firstName} ${this.lastName} and I am ${this.age} years old.`;
    }
};

const anotherPersonWithAge = {
    firstName: "Oleksandr",
    lastName: "Tushych",
    age: 25
};


const fullNameWithAgeCall = personWithAge.fullNameWithAge.call(anotherPersonWithAge, "Hello");
console.log(fullNameWithAgeCall); 


const fullNameWithAgeApply = personWithAge.fullNameWithAge.apply(anotherPersonWithAge, ["Hi"]);
console.log(fullNameWithAgeApply); 


const boundFullNameWithAge = personWithAge.fullNameWithAge.bind(anotherPersonWithAge);
console.log(boundFullNameWithAge("Greetings")); 

// 10. Створіть функцію яка приймає коллбек – викликає його з переданими аргументами та
//виводить в консоль імя функції, аргументи та час коли функція викликана.

function mainFunction(callback, ...args) {
    const functionName = callback.name || 'Anonymous Function';
    const callTime = new Date().toLocaleTimeString();
    
    console.log(`Calling function: ${functionName}`);
    console.log(`Arguments: ${args}`);
    console.log(`Call Time: ${callTime}`);
    
    callback(...args);
}

// Calling the main function with an anonymous callback function
mainFunction((arg1, arg2) => {
    console.log(`Anonymous callback function called with arguments: ${arg1}, ${arg2}`);
}, 'Hello', 'World');

// 11. Створіть функцію яка кешує останній виклик на 10 секунд.

function cacheFunction(fn) {
    let lastResult;
    let lastArgs;
    let lastCallTime = 0;

    return function(...args) {
        const now = Date.now();

        if (now - lastCallTime < 10000 && lastArgs && lastArgs.every((arg, index) => arg === args[index])) {
            return lastResult;
        }

        lastResult = fn(...args);
        lastArgs = args;
        lastCallTime = now;

        return lastResult;
    };
}

const add = (a, b) => a + b;
const cachedAdd = cacheFunction(add);

console.log(cachedAdd(1, 2)); 
console.log(cachedAdd(1, 2)); 
setTimeout(() => console.log(cachedAdd(1, 2)), 11000); 



