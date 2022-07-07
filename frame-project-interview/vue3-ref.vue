<script>
export default {
  mounted() {
    this.$refs.input.focus();
  }
};
</script>

<template>
  <input ref="input" />
</template>

<script setup>
import { ref, onMounted } from "vue";

// 声明一个 ref 来存放该元素的引用
// 必须和模板 ref 同名
const input = ref(null);

onMounted(() => {
  input.value.focus();
});
</script>

<template>
  <input ref="input" />
</template>

<script setup>
import { ref, onMounted } from "vue";

const list = ref([
  /* ... */
]);

const itemRefs = ref([]);

onMounted(() => console.log(itemRefs.value));
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Child from "./Child.vue";

const child = ref(null);

onMounted(() => {
  // child.value 是 <Child /> 组件的实例
});
</script>

<template>
  <Child ref="child" />
</template>

<script setup>
import { reactive } from "vue";

const state = reactive({ count: 0 });

let state = reactive({ count: 0 });

// 上面的引用 ({ count: 0 }) 将不再被追踪（响应性连接已丢失！）
state = reactive({ count: 1 });

const state = reactive({ count: 0 });

// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = state.count;
// 不影响原始的 state
n++;

// count 也和 state.count 失去了响应性连接
let { count } = state;
// 不会影响原始的 state
count++;

// 该函数接收一个普通数字，并且
// 将无法跟踪 state.count 的变化
callSomeFunction(state.count);
</script>

<script setup>
import { ref } from "vue";

const count = ref(0);

const count = ref(0);

console.log(count); // { value: 0 }
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
</script>

<script setup>
const state = reactive({
  foo: 1,
  bar: 2
});

const fooRef = toRef(state, "foo");

// 更改该 ref 会更新源属性
fooRef.value++;
console.log(state.foo); // 2

// 更改源属性也会更新该 ref
state.foo++;
console.log(fooRef.value); // 3
</script>

<script setup>
import { toRef } from "vue";

const props = defineProps(/* ... */);

// 将 `props.foo` 转换为 ref，然后传入
// 一个组合式函数
useSomeFeature(toRef(props, "foo"));

const state = reactive({
  foo: 1,
  bar: 2
});

const stateAsRefs = toRefs(state);
/*
stateAsRefs 的类型：{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// 这个 ref 和源属性已经“链接上了”
state.foo++;
console.log(stateAsRefs.foo.value); // 2

stateAsRefs.foo.value++;
console.log(state.foo); // 3

function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  });

  // ...基于状态的操作逻辑

  // 在返回时都转为 ref
  return toRefs(state);
}

// 可以解构而不会失去响应性
const { foo, bar } = useFeatureX();
</script>

<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">
    {{ count }}
    <!-- 无需 .value -->
  </button>
</template>
