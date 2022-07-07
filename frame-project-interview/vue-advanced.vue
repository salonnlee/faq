<script>
// 修改数据
vm.list.push("new list item");
// DOM 还没有更新
Vue.nextTick(() => {
  // DOM 更新了
  console.log(this.$refs.ul.childNodes.length);
});

Vue.component("async-example", function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: "<div>I am async!</div>"
    });
  }, 1000);
});

Vue.component(
  "async-webpack-example",
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import("./my-async-component")
);

new Vue({
  // ...
  components: {
    "my-component": () => import("./my-async-component")
  }
});

const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import("./MyComponent.vue"),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
});

// 定义一个混入对象
const myMixin = {
  created: function () {
    this.hello();
  },
  methods: {
    hello: function () {
      console.log("hello from mixin!");
    }
  }
};

// 定义一个使用混入对象的组件
const Component = Vue.extend({
  mixins: [myMixin]
});

const component = new Component(); // => "hello from mixin!"

const mixin = {
  data: function () {
    return {
      message: "hello",
      foo: "abc"
    };
  },
  created: function () {
    console.log("混入对象的钩子被调用");
  },
  methods: {
    foo: function () {
      console.log("foo");
    },
    conflicting: function () {
      console.log("from mixin");
    }
  }
};

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: "goodbye",
      bar: "def"
    };
  },
  created: function () {
    console.log("组件钩子被调用");
    console.log(this.$data);
    // => { message: "goodbye", foo: "abc", bar: "def" }
  },
  methods: {
    bar: function () {
      console.log("bar");
    },
    conflicting: function () {
      console.log("from self");
    }
  }
});

// => "混入对象的钩子被调用"
// => "组件钩子被调用"

vm.foo(); // => "foo"
vm.bar(); // => "bar"
vm.conflicting(); // => "from self"
</script>
