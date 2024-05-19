// 1. Створіть клас для автомобіля з такими властивостями, як марка, модель і рік випуску.
// Потім створіть екземпляр автомобіля та встановіть його властивості. Виконайте дане
// завдання:
// • З використанням функції конструктора
// • З використанням синтаксису класс


function Car1(brand, model, date) {
    this.brand = brand;
    this.model = model;
    this.year = year;
}

class Car2 {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    displayDetails() {
        return `Car Details: ${this.year} ${this.brand} ${this.model}`;
    }
}

let myCar1 = new Car2('Tesla', 'Model S', 2023);
let myCar2 = new Car2('Toyota', 'Corolla', 2023);

console.log(myCar1.displayDetails());
console.log(myCar2.displayDetails());

// 2. Створіть два екземпляри даного класу користуючись методом Object.create()

let myCar3 = Object.create(Car2.prototype);
myCar3.brand = 'BMW';
myCar3.model = 'X5';
myCar3.year = 2022;

let myCar4 = Object.create(Car2.prototype);
myCar4.brand = 'Audi';
myCar4.model = 'A4';
myCar4.year = 2021;

console.log(myCar3.displayDetails());
console.log(myCar4.displayDetails());

// 3. Створіть класс персона який містить поля імя, прізвище, рік народження. Створіть даний
// клас не використовуючи class синтаксис. Додайте в даний клас методи які виводитимуть
// вік та повне імя особи.

function Person(firstName, lastName, birthYear) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
}

Person.prototype.getAge = function() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
};

Person.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
};

const person1 = new Person('Sasha', 'Nykonchuk', 2003);
console.log(person1.getFullName()); 
console.log(person1.getAge()); 

// 4. Створіть субкласс класу персона який міститиме поле посада тп перевизначає метод
// виведення повного імені додаючи туди посаду особи.

class Person1 {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Employee extends Person {
  constructor(firstName, lastName, position) {
    super(firstName, lastName);
    this.position = position;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}, ${this.position}`;
  }
}

const employee = new Employee('Oleksandr', 'Nykonchuk', 'Student');
console.log(employee.getFullName()); 


// 5. Напишіть метод який приймає два обєкти та визначає чи вони обєкти одног класу та
// виводить в консоль фразу з іменами класів обєктів

function compareObjects(obj1, obj2) {
    if (obj1 instanceof obj2.constructor) {
        console.log(`Both objects belong to the same class: ${obj1.constructor.name}`);
    } else {
        console.log(`The objects belong to different classes.`);
    }
}

class Car {
    constructor(make) {
        this.make = make;
    }
}

class Bike {
    constructor(type) {
        this.type = type;
    }
}

const car1 = new Car('Toyota');
const car2 = new Car('Honda');
const bike = new Bike('Mountain');

compareObjects(car1, car2); 
compareObjects(car1, bike); 

// 6. Створіть метод який приймає екземпляр класу Person та перетворює його у екземпляр
// ObservedPerson. Екземпляр ObservedPerson має вести себе аналогічно до класу Person та
// при виклику його методів буде виводити в консоль кількість викликів.

function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}.`);
};

function ObservedPerson(person) {
  this.person = person;
  this.callCount = 0;
}

ObservedPerson.prototype.sayHello = function () {
  this.callCount++;
  console.log(`Hello (Call Count: ${this.callCount}), I'm ${this.person.name}.`);
};

function convertToObservedPerson(person) {
  return new ObservedPerson(person);
}

const person = new Person('Bob');
const observedPerson = convertToObservedPerson(person);
observedPerson.sayHello();
observedPerson.sayHello();


// 7. Створіть абстрактний клас під назвою Shape, який визначає методи для обчислення площі
// та периметра. Змусьте дочірні класи імплементувати ці методи.

class Shape {
    constructor() {
        if (this.constructor === Shape) {
            throw new Error("Cannot instantiate abstract class Shape directly");
        }
    }

    calculateArea() {
        throw new Error("Method 'calculateArea()' must be implemented.");
    }

    calculatePerimeter() {
        throw new Error("Method 'calculatePerimeter()' must be implemented.");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    calculateArea() {
        return Math.PI * this.radius ** 2;
    }

    calculatePerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

const circle = new Circle(3);
console.log("Circle Area:", circle.calculateArea()); 
console.log("Circle Perimeter:", circle.calculatePerimeter()); 

// 8. Створіть масив фігур, що включає екземпляри кожного класу фігур. Перегляньте масив і
// викличте методи площі та периметра для кожної фігури.

class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }

    calculateArea() {
        return this.side ** 2;
    }

    calculatePerimeter() {
        return 4 * this.side;
    }
}

class Triangle extends Shape {
    constructor(a, b, c) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
    }

    calculateArea() {
        const s = (this.a + this.b + this.c) / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }

    calculatePerimeter() {
        return this.a + this.b + this.c;
    }
}

const myCircle = new Circle(3);
const square = new Square(5);
const triangle = new Triangle(3, 4, 5);


const shapeArray = [circle, square, triangle];


function shapeInfo(shapes) {
    for (let shape of shapes) {
        console.log(`Shape: ${shape.constructor.name}`);
        console.log(`Area: ${shape.calculateArea()}`);
        console.log(`Perimeter: ${shape.calculatePerimeter()}`);
        console.log('---------------------');
    }
}


shapeInfo(shapeArray);
