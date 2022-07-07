function SuperClass() {
  this.superSymbol = Symbol("super");
  this.superList = [];
}
SuperClass.prototype.getSuperSymbol = function () {
  return this.superSymbol;
};

function SubClass() {
  this.subSymbol = Symbol("sub");
}
// 创建基类 SuperClass 的实例, 并将其赋值给继承类 SubClass 的原型 prototype
SubClass.prototype = new SuperClass();
SubClass.prototype.getSubSymbol = function () {
  return this.subSymbol;
};

// const subInstance = new SubClass();
// console.log(subInstance.getSubSymbol()); // Symbol(sub)
// console.log(subInstance.getSuperSymbol()); // Symbol(super)

// const subInstance1 = new SubClass();
// console.log(subInstance1.superList); // []

// const subInstance2 = new SubClass();
// subInstance2.superList.push("one");
// console.log(subInstance1.superList); // ['one']

// --------------------------------------------------

function SuperClass() {
  this.superSymbol = Symbol("super");
}
SuperClass.prototype.getSuperSymbol = function () {
  return this.superSymbol;
};

function SubClass() {
  this.subSymbol = Symbol("sub");
  // 在继承类 SubClass 实例初始化时, 调用基类 SuperClass 构造函数, 以此将基类实例的属性和方法复制给继承类
  SuperClass.call(this);
}
SubClass.prototype.getSubSymbol = function () {
  return this.subSymbol;
};

// const subInstance = new SubClass();
// console.log(subInstance.superSymbol); // Symbol(super)
// console.log(subInstance.getSuperSymbol()); // Uncaught TypeError: subInstance.getSuperSymbol is not a function

// --------------------------------------------------

function SuperClass() {
  this.superSymbol = Symbol("super");
}
SuperClass.prototype.getSuperSymbol = function () {
  return this.superSymbol;
};

function SubClass() {
  this.subSymbol = Symbol("sub");
  // 用构造函数继承基类 SuperClass 实例的属性和方法
  SuperClass.call(this);
}
// 用原型链继承基类 SuperClass 实例的属性和方法
SubClass.prototype = new SuperClass();
// 使 SubClass.prototype 的构造器属性指向自己的构造函数 SubClass
SubClass.prototype.constructor = SubClass;
SubClass.prototype.getSubSymbol = function () {
  return this.subSymbol;
};

// const subInstance = new SubClass();
// console.log(subInstance.superSymbol); // Symbol(super)
// console.log(subInstance.getSuperSymbol()); // Symbol(super)

// --------------------------------------------------

function objectCreate(obj) {
  function F() {}
  // 将继承对象直接赋值给空函数类的原型
  F.prototype = obj;
  return new F();
}

// const kevin = {
//   name: "kevin",
//   friends: ["kate", "randall"]
// };

// const kate = objectCreate(kevin);
// kate.name = "kate";
// kate.friends.push("toby");

// const randall = objectCreate(kevin);
// randall.name = "randall";
// randall.friends.push("beth");

// console.log(kevin); // { name: 'kevin', friends: ['kate', 'randall', 'toby', 'beth'] }
// console.log(kate); // { name: 'kate' }
// console.log(randall); // { name: 'randall' }

// --------------------------------------------------

function objectCreateEnhanced(obj) {
  const enhancedObj = objectCreate(obj);

  // 增强继承类实例对象
  enhancedObj.parents = ["jack", "rebecca"];
  enhancedObj.greet = function () {
    console.log(`Hi, I'm ${this.name}!`);
  };

  return enhancedObj;
}

// const kevin = {
//   name: "kevin",
//   friends: ["kate", "randall"]
// };

// const kate = objectCreateEnhanced(kevin);
// kate.name = "kate";
// kate.friends.push("toby");

// const randall = objectCreateEnhanced(kevin);
// randall.name = "randall";
// randall.friends.push("beth");

// console.log(kevin); // { name: 'kevin', friends: ['kate', 'randall', 'toby', 'beth'] }
// console.log(kate); // { name: 'kate' }
// console.log(randall); // { name: 'randall' }

// --------------------------------------------------

function inheritPrototype(subType, superType) {
  const prototype = Object.create(superType.prototype); // 创建对象, 创建基类原型的一个副本
  prototype.constructor = subType; // 增强对象, 弥补因重写原型而失去的默认的 constructor 属性
  subType.prototype = prototype; // 指定对象, 将新创建的对象赋值给继承类的原型
}

function SuperClass() {
  this.superSymbol = Symbol("super");
  this.superList = [];
}
SuperClass.prototype.getSuperSymbol = function () {
  return this.superSymbol;
};

function SubClass() {
  this.subSymbol = Symbol("sub");
  // 借用构造函数增强继承类实例属性 (支持传参和避免篡改)
  SuperClass.call(this);
}
// 将基类原型指向继承类
inheritPrototype(SubClass, SuperClass);
SubClass.prototype.getSubSymbol = function () {
  return this.subSymbol;
};

// const subInstance1 = new SubClass();
// console.log(subInstance1.superList); // []

// const subInstance2 = new SubClass();
// subInstance2.superList.push("one");
// console.log(subInstance1.superList); // []

// --------------------------------------------------

function _inherits(subType, superType) {
  // 创建对象, 创建父类原型的一个副本
  subType.prototype = Object.create(superType && superType.prototype, {
    // 增强对象, 弥补因重写原型而失去的默认的 constructor 属性
    constructor: {
      value: subType,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (superType) {
    // 指定对象, 将新创建的对象赋值给子类的原型
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subType, superType)
      : (subType.__proto__ = superType);
  }
}

// --------------------------------------------------

Object.create = function (proto) {
  function F() {}
  F.prototype = proto;
  return new F();
};

Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
};

function _new(Con, ...args) {
  // 基于构造函数 Con 的原型创建一个新的对象
  const newObj = Object.create(Con.prototype);
  // 添加属性到新创建的对象上, 并获取构造函数 Con 的执行结果
  const result = Con.apply(newObj, args);
  // 如果执行结果有返回值并且是一个对象, 则返回执行结果. 否则返回新创建的对象
  return result instanceof Object ? result : newObj;
}
