<script>
let val1 = 2;
let val2 = 3;
let sum = val1 + val2;

console.log(sum); // 5

val1 = 3;

console.log(sum); // 仍然是 5
</script>

<script>
const updateSum = () => {
  sum = val1 + val2;
};

// 维持一个执行副作用的栈
const runningEffects = [];

const createEffect = (fn) => {
  // 将传来的 fn 包裹在一个副作用函数中
  const effect = () => {
    runningEffects.push(effect);
    fn();
    runningEffects.pop();
  };

  // 立即自动执行副作用
  effect();
};

const dinner = {
  meal: "tacos"
};

const handler = {
  get(target, property, receiver) {
    track(target, property);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    trigger(target, property);
    return Reflect.set(...arguments);
  }
};

const proxy = new Proxy(dinner, handler);
console.log(proxy.meal);

// intercepted!
// tacos
</script>
