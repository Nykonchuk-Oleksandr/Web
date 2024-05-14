//1. Створіть масив persons та додайте в нього 5 обєктів типу { name: ‘John’, age: 23, city:
// ‘Boston’}. Для масиву persons встановіть властивості groupName=’A’, teacher=’Joan Doe’,
// year=’2023’. З допомогою різних версій циклу for виведіть елементи масиву та властивості
// масиву.
function objects(){
    let my_obj = { name: "John", age: 23, city: "Boston"};
    let obj_array = [];
    for (let i = 0; i < 5; i++){
        obj_array.push(my_obj);
    }

    for (let i = 0; i < 5; i++){
        console.log(obj_array[i]);
    }
    console.log("-------------");

    for (i in obj_array){
        console.log(obj_array[i]);
    }
    console.log("-------------");

    for (obj of obj_array){
        console.log(obj);
    }
}
// 2. Створіть обєкт defaults призначений для збереження налаштувань програми який містить
// поля mode=test, debugLevel=error, logFolder=root. Створіть обєкт userSetting який містить
// поля mode=production, debugLevel=trace. Створіть функцію яка прийме як аргументи дані
// два обєкти та обєднає властивості цих двох обєктів в один обєкт надаючи пріоритет
// властивостям з обєкта userSetting. Запропонуєти як мінімум 3 способи для вирішення цієї
// задачі
function mergeSettings1(defaults, userSettings) {
    return Object.assign({}, defaults, userSettings);
}

function mergeSettings2(defaults, userSettings) {
    return { ...defaults, ...userSettings };
}

function mergeSettings3(defaults, userSettings) {
    let mergedSettings3 = { ...defaults };
    for (let key in userSettings) {
        if (userSettings.hasOwnProperty(key)) {
            mergedSettings3[key] = userSettings[key];
        }
    }
    return mergedSettings3;
}

const defaults = {
    mode: 'test',
    debugLevel: 'error',
    logFolder: 'root'
};

const userSettings = {
    mode: 'production',
    debugLevel: 'trace'
};

console.log(mergeSettings1(defaults, userSettings));
console.log(mergeSettings2(defaults, userSettings));
console.log(mergeSettings3(defaults, userSettings));

// 3. Для обєкта person із завдання 1 додайте можливість отримати рік народження не додаючи
// додаткової властивості до цього обєкта. Зробіть дане поле доступним тільки для читання.

let person = { name: "Alice", age: 30, city: "Kyiv", get birthYear() {
        return new Date().getFullYear() - this.age;
    }
};

console.log(person.birthYear);

//4. Якими способами можна обєднати два масиви?

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinedArray = [...array1, ...array2];
console.log(combinedArray);

const combinedArray2 = array1.concat(array2);
console.log(combinedArray2);

for (let i = 0; i < array2.length; i++) {
  array1.push(array2[i]);
}
console.log(array1);

//5. Напишіть алгоритм який перетворить масив persons у масив текстових фрагментів типу
// ’John from Boston born in 2000’
function get_birthYear(age) {
    return new Date().getFullYear() - age;
}

function change() {
    let person = { name: "Alice", age: 30, city: "Kyiv", get_birthYear() {
        return new Date().getFullYear() - this.age;
    }};
    let my_obj = { name: "John", age: 23, city: "Boston"};
    let obj_array = [];
    for (let i = 0; i < 5; i++){
        obj_array.push(my_obj);
    }
    obj_array.push({name: "Sasha", age: 20, city: "Rivne"});
    
    let string_array = [];
    for (obj of obj_array){
        string_array.push(obj.name + " from " + obj.city + " born in " + get_birthYear(obj.age));
    }
    
    console.log(string_array);
}
 //6. Напишіть алгоритм який з масиву persons вибере людей старше 20 років.
 
 function personOver20(){
    let obj_array = [{ name: "John", age: 23, city: "Boston"},
    {name: "Petro", age: 19, city: "Kyiv"},
    {name: "Dima", age: 10, city: "Rivne"},
    {name: "Sasha", age: 20, city: "Rivne"}];
 let over20 = []
 for (person of obj_array){
	 if(person.age > 20){
		 over20.push(person);
	 }
 }
 console.log(over20);
 }
 
 // 7. З допомогою деструктуризації присвойте значення полів name, city із обєкта person у
// окремі змінні. З допомогою деструктуризації присвойте перший елемен масиву persons у
// зокрему змінну.
function destructuring_test(){
    let person = { name: "John", age: 23, city: "Boston"};
    let name, age, city;
    [name, age, city] = [person.name, person.age, person.city]
    console.log(name, age, city);

    let persons = [{ name: "John", age: 23, city: "Boston"},
   {name: "Petro", age: 19, city: "Kyiv"},
    {name: "Dima", age: 10, city: "Rivne"},
    {name: "Sasha", age: 20, city: "Rivne"}];

    let first;
    [first] = persons;
    console.log(first);
}
// 8. Створіть функцію getUserData яка приймє аргументом імя користувача та повертає обєкт із
// масиву persons. Якщо обєкт з таким іменем не знайдений функція має згенерувати обєкт
// помилки new Error(‘Unable to find user’). Створіть функцію showUserInfo яка приймає
// аргументом імя, виводить в консоль текст ‘Loading’, викликає функцію getUserData, якщо
// користувач знайдений – виводить його поля в консоль і текст ‘Loading finished’, якщо
// користувач не знайдений виведіть текст помилки та текст ‘Loading finished’.
function getUserData(name){
    let persons = [{ name: "John", age: 23, city: "Boston"},
     {name: "Petro", age: 19, city: "Kyiv"},
    {name: "Dima", age: 10, city: "Rivne"},
    {name: "Sasha", age: 20, city: "Rivne"}];
	
    let result = persons.find((person) => person.name == name);
    if(!result){
        throw new Error("Unable to find user");
    }
    return result;
}

function showUserInfo(name){
    console.log("Loading")
    try{
        console.log(getUserData(name));
    } catch (e) {
        console.error(`${e.name}: ${e.message}`)
    }
    
    console.log("Loading finished");
}
 //9. Напишіть функцію яка перетворить текстовий фрагмент у масив букв.

function textToArray(text) {
  return text.split('');
}

const textFragment = 'JavaScript';
const lettersArray = textToArray(textFragment);
console.log(lettersArray);

// 10. Створіть функцію яка відобразить букви слова у зворотньому порядку.

function reverseWordLetters(word) {
    return word.split('').reverse().join('');
}


const reversedWord = reverseWordLetters('hello');
console.log(reversedWord); 

// 11. Напишіть функцію яка визначатиме чи передане імя файлу файл формату ‘.js’

function checkFileFormat(fileName) {
    return /\.js$/.test(fileName);
}


console.log(checkFileFormat("script.js")); 
console.log(checkFileFormat("style.css")); 

// 12. Напишіть функцію яка перетворить речення на масив слів

function sentenceToArray(sentence) {
    return sentence.split(' ').filter(word => word.length > 0);
}

const sentence = "Coding is fun!";
const wordsArray = sentenceToArray(sentence);
console.log(wordsArray);

// 13. Напишіть алгорим який замінить певне слово у текстовому фрагменті

function replaceWordCaseSensitive(text, wordToReplace, newWord) {
    return text.replace(new RegExp('\\b' + wordToReplace + '\\b', 'g'), newWord);
}


const originalText = "JavaScript is an amazing language. javascript is fun to learn.";
const newText = replaceWordCaseSensitive(originalText, 'javascript', 'JavaScript');
console.log(newText);