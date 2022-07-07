<script>
import { ref } from "vue";

export default {
  setup() {
    const countRef = ref(1);

    return () => {
      return <p>count is {countRef.value}</p>;
    };
  }
};

import { defineComponent } from "vue";

const MyComponent = defineComponent({
  data() {
    return { count: 1 };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
});

import { defineComponent, ref } from "vue";

const MyComponent = defineComponent(function MyComponent() {
  const countRef = ref(1);
  return <p>count is {countRef.value}</p>;
});
</script>

<script setup>
// import 引入
import { capitalize } from "./helpers";

// 变量
const msg = "Hello!";

// 函数
function log() {
  console.log(capitalize(msg));
}
</script>

<template>
  <div @click="log">{{ capitalize(msg) }}</div>
</template>

<script setup>
const props = defineProps({
  foo: String
});

const emit = defineEmits(["change", "delete"]);
// setup code
</script>

<script setup>
import { ref } from "vue";

const a = 1;
const b = ref(2);

defineExpose({
  a,
  b
});
</script>

<script setup>
import { useSlots, useAttrs } from "vue";

const slots = useSlots();
const attrs = useAttrs();
</script>

<script>
// 普通 <script>, 在模块范围下执行(只执行一次)
runSideEffectOnce();

// 声明额外的选项
export default {
  inheritAttrs: false,
  customOptions: {}
};
</script>

<script setup>
// 在 setup() 作用域中执行 (对每个实例皆如此)
</script>
