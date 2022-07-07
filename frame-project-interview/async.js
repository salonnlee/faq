async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// --------------------------------------------------

// async function fn() {
//   return 1; // return Promise.resolve(1)
// }
// const result = fn(); // Promise
// result.then((value) => {
//   console.log(value); // 1
// });

// !(async function () {
//   const value = await 1; // Promise.resolve(1).then(value => {})
//   console.log(value); // 1
// })();

// --------------------------------------------------

// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }
// async function async2() {
//   console.log("async2");
// }

// console.log("script start");
// async1();
// console.log("script end");

// script start
// async1 start
// async2
// script end
// async1 end
