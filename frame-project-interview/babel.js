// syntax
let count = 1;
const fn = () => {};

// api
arr.includes();
new Promise();

const babelrc = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        absoluteRuntime: false,
        corejs: 3,
        helpers: true,
        regenerator: true,
        useESModules: false
      }
    ]
  ]
};

const fn1 = function () {};
