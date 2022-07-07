// hello.js
export default "Hello World!";

// main.js
import helloWorldStr from "./hello.js";
console.log(helloWorldStr);

// 默认打包结果
[
  function (module, __webpack_exports__, __webpack_require__) {
    var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(1);
    console.log(__WEBPACK_IMPORTED_MODULE_0__util_js__["a"]);
  },
  function (module, __webpack_exports__, __webpack_require__) {
    __webpack_exports__["a"] = "Hello World!";
  }
];

const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");

module.exports = {
  resolve: {
    // 针对 NPM 中的第三方模块优先使用 jsnext:main 指定的 ES6 Module 语法的文件入口
    mainFields: ["jsnext:main", "browser", "main"]
  },
  plugins: [
    // 开启 Scope Hoisting
    new ModuleConcatenationPlugin()
  ]
};

[
  function (module, __webpack_exports__, __webpack_require__) {
    var helloWorldStr = "Hello World!";
    console.log(helloWorldStr);
  }
];

// webpack.config.js
const webpackConfig = {
  entry: {
    index: [
      "webpack-dev-server/client?http://localhost:8080/",
      "webpack/hot/dev-server",
      path.join(__dirname, "./index.js")
    ]
  },
  devServer: {
    hot: true
  },
  plugins: [new wepback.HotReplacementPlugin()]
};

// index.js
if (module.hot) {
  module.hot.accept("./hotdog.js", function () {
    console.log("Accepting the updated hotdog module!");
  });
}
