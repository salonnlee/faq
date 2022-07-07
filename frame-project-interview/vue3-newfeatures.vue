<script>
const app = new Vue();

Vue.use();
Vue.mixin();
Vue.component();
Vue.direactive();
</script>

<script>
const app = Vue.createApp();

app.use();
app.mixin();
app.component();
app.direactive();
</script>

<template>
  <div>
    <p>{{ text }}</p>
    <button v-on:click="$emit('accepted')">OK</button>
  </div>
</template>
<script>
export default {
  props: ["text"],
  emits: ["accepted"],
  setup(props, { emit }) {
    $emit("accepted");
  }
};
</script>

<template>
  <button @click="foo($event), bar($event)">Trigger two methods</button>
</template>

<script>
export default {
  methods: {
    foo: function () {},
    bar: function () {}
  }
};
</script>

<template>
  <div class="blog-post">
    <h3>{{ title }}</h3>
    <div v-html="content"></div>
  </div>
</template>

<template>
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</template>

<script>
// 这将发出警告
app.component("custom-layout", {
  template: `
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  `
});

// 没有警告，$attrs 被传递到 <main> 元素
app.component("custom-layout", {
  template: `
    <header>...</header>
    <main v-bind="$attrs">...</main>
    <footer>...</footer>
  `
});

// vue2
const asyncModal = () => import("./Modal.vue");

const asyncModal = {
  component: () => import("./Modal.vue"),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
};

// vue3
import { defineAsyncComponent } from "vue";
import ErrorComponent from "./components/ErrorComponent.vue";
import LoadingComponent from "./components/LoadingComponent.vue";

// 不带选项的异步组件
const asyncModal = defineAsyncComponent(() => import("./Modal.vue"));

// 带选项的异步组件
const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import("./Modal.vue"),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
});

// 2.x 版本
const oldAsyncComponent = (resolve, reject) => {
  /* ... */
};

// 3.x 版本
const asyncComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
);
</script>

<template>
  <button @click="modalOpen = true">
    Open full screen modal! (With teleport!)
  </button>

  <teleport to="body">
    <div v-if="modalOpen" class="modal">
      <div>
        I'm a teleported modal! (My parent is "body")
        <button @click="modalOpen = false">Close</button>
      </div>
    </div>
  </teleport>
</template>

<template>
  <suspense>
    <template #default>
      <todo-list />
    </template>

    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>

<script>
export default {
  components: {
    TodoList: defineAsyncComponent(() => import("./TodoList.vue"))
  }
};

export default {
  async setup() {
    // 在 `setup` 内部使用 `await` 需要非常小心
    // 因为大多数组合式 API 函数只会在
    // 第一个 `await` 之前工作
    const data = await loadData()

    // 它隐性地包裹在一个 Promise 内
    // 因为函数是 `async` 的
    return {
      // ...
    }
  }
}

const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 用于响应性追踪
  console.log(copy.count)
})

// 变更 original 会触发依赖于副本的侦听器
original.count++

// 变更副本将失败并导致警告
copy.count++ // 警告!
</script>
