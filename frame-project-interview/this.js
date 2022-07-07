const kevin = {
  name: "kevin",
  greetSetTimeout() {
    setTimeout(function () {
      // this => window
      console.log(`Hi, I'm ${this.name}!`);
    });
  },
  greetSetTimeoutWithArrowFunction() {
    setTimeout(() => {
      // this => kevin
      console.log(`Hi, I'm ${this.name}!`);
    });
  }
};

// kevin.greetSetTimeout(); // Hi, I'm undefined!
// kevin.greetSetTimeoutWithArrowFunction(); // Hi, I'm kevin!

Function.prototype.bind = function () {
  // 将参数解析为数组
  const args = Array.prototype.slice.call(arguments);
  // 获取需要绑定的 this (数组第一个元素)
  const t = args.shift();
  const self = this; // 当前函数
  return function () {
    // 执行时可能还会传递的新参数
    const otherArgs = Array.prototype.slice.call(arguments);
    // 执行原函数, 并返回结果
    return self.apply(t, args.concat(otherArgs));
  };
};

Function.prototype.call = function (...args) {
  const t = args.shift();
  const self = this;
  t.func = self;
  const result = t.func(...args);
  delete t.func;
  return result;
};

const xiaoming = {
  name: "xiaoming",
  greet() {
    console.log(`Hi, I'm ${this.name}!`);
    console.log("arguments are", ...arguments);
  }
};

const xiaohong = {
  name: "xiaohong"
};

xiaoming.greet(1, 2, 3);
xiaoming.greet.call(xiaohong, 4, 5, 6);
