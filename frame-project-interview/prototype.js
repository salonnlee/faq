// function Person(name) {
//   this.name = name;
// }
// Person.prototype.greet = function () {
//   console.log(`Hi, I'm ${this.name}!`);
// };

class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hi, I'm ${this.name}!`);
  }
}

const kevin = new Person("kevin");
kevin.greet(); // Hi, I'm kevin!

console.log(kevin.__proto__ === Person.prototype); // true
console.log(Person.prototype.constructor === Person); // true

class Accountant extends Person {
  constructor(name) {
    super(name);
  }
  accounting() {
    console.log(`${this.name} is accounting...`);
  }
}

const kate = new Accountant("kate");
kate.accounting(); // kate is accounting...

console.log(Accountant.prototype.__proto__ === Person.prototype); // true
console.log(kate instanceof Accountant); // true
console.log(kate instanceof Person); // true

const obj = new Object();
console.log(obj.__proto__ === Object.prototype); // true

const fn = function () {};
console.dir(fn.prototype); // { constructor: fn, __proto__: Object.prototype }
