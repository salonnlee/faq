<template>
  <div id="watch-demo">
    <p>
      Ask a yes/no question:
      <input v-model="question" />
    </p>
    <p>{{ answer }}</p>

    <!-- class 绑定 -->
    <div :class="{ red: isRed }"></div>
    <div :class="[classA, classB]"></div>
    <div :class="[classA, { classB: isB, classC: isC }]"></div>

    <!-- style 绑定 -->
    <div :style="{ fontSize: size + 'px' }"></div>
    <div :style="[styleObjectA, styleObjectB]"></div>

    <li v-for="todo in todos" v-if="!todo.isComplete" :key="todo.id">
      {{ todo }}
    </li>
  </div>
</template>

<script>
const watchDemoVM = new Vue({
  el: "#watch-demo",
  data: {
    question: "",
    answer: "I cannot give you an answer until you ask a question!"
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = "Waiting for you to stop typing...";
      this.debouncedGetAnswer();
    },
    someObject: {
      handler: function (val, oldVal) {
        console.log("someObject has changed", val, oldVal);
      },
      deep: true,
      immediate: true // 立即执行一次侦听 handler 函数, 不管 someObject 有没有变化
    }
  },
  created: function () {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
  methods: {
    getAnswer: function () {
      this.answer = "Thinking...";
      const vm = this;
      axios
        .get("https://yesno.wtf/api")
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer);
        })
        .catch(function (error) {
          vm.answer = "Error! Could not reach the API. " + error;
        });
    }
  }
});
</script>

<script>
const vm = new Vue({
  el: "#computed-demo",
  data: {
    firstName: "Foo",
    lastName: "Bar"
  },
  computed: {
    fullName: function () {
      return this.firstName + " " + this.lastName;
    }
  }
});
</script>

<template>
  <div class="blog-post">
    <h3>{{ post.title }}</h3>
    <button v-on:click="$emit('enlarge-text')">Enlarge text</button>
    <div v-html="post.content"></div>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<script>
const vm = new Vue();
vm.$on("print", function (msg) {
  console.log(msg);
});
vm.$emit("print", "hi");
// => "hi"
vm.$off("print");

const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    }
  }
});

store.dispatch("increment");
</script>

<script>
export default {
  provide: function () {
    return { getMap: this.getMap };
  }
};
</script>
