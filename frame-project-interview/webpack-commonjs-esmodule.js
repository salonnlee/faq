// math.js
let basicNum = 0;
function add(a, b) {
  return a + b;
}

module.exports = {
  add: add,
  basicNum: basicNum
};

// 引用自定义的模块时, 参数包含路径, 可省略.js
const math = require("./math");
math.add(2, 5);

// 引用核心模块时, 不需要带路径
const http = require("http");
// http.createService(...).listen(3000);

// math.js
let basicNum = 0;
var add = function (a, b) {
  return a + b;
};
export { basicNum, add };

// index.js
import { basicNum, add } from "./math";
add(2, basicNum);

// index.js
// 首先使用 config() 指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    jquery: "jquery.min", // 实际路径为js/lib/jquery.min.js
    underscore: "underscore.min"
  }
});

// 然后使用 require() 异步加载模块
require(["jquery", "math"], function ($, math) {
  const result = math.add(10, 20);
  $("body").html(result);
});

define(["underscore"] /* 定义的模块本身也依赖其他模块 */, function () {
  let basicNum = 0;
  const add = function (x, y) {
    return x + y;
  };
  return {
    add: add,
    basicNum: basicNum
  };
});

// AMD
define(["a", "b", "c", "d", "e", "f"], function (a, b, c, d, e, f) {
  // 等于在最前面声明并初始化了要用到的所有模块
  a.doSomething();
  if (false) {
    // 即便没用到某个模块 b, 但 b 还是提前执行了
    b.doSomething();
  }
});

// CMD
define(function (require, exports, module) {
  const a = require("./a"); // 在需要时申明
  a.doSomething();
  if (false) {
    const b = require("./b");
    b.doSomething();
  }
});
