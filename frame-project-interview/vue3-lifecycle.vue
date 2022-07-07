<!-- MyBook.vue -->
<template>
  <div>{{ readersNumber }} {{ book.title }}</div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    const readersNumber = ref(0);
    const book = reactive({ title: "Vue 3 Guide" });

    // 暴露给模板
    return {
      readersNumber,
      book
    };
  }
};

import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from "vue";

const MyComponent = {
  setup() {
    // beforeCreate + created

    onBeforeMount(() => {
      // beforeMount
      console.log("beforeMount!");
    });
    onMounted(() => {
      // mounted
      console.log("mounted!");
    });

    onBeforeUpdate(() => {
      // beforeUpdate
      console.log("beforeUpdate!");
    });
    onUpdated(() => {
      // updated
      console.log("updated!");
    });

    onBeforeUnmount(() => {
      // beforeUnmount
      console.log("beforeUnmount!");
    });
    onUnmounted(() => {
      // unmounted
      console.log("unmounted!");
    });
  }
};
</script>
