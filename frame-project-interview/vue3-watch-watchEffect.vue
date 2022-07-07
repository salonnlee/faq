<script>
// 侦听一个 getter
const state = reactive({ count: 0 });
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
);

// 直接侦听ref
const count = ref(0);
watch(count, (count, prevCount) => {
  /* ... */
});
</script>

<script>
const count = ref(0);

watchEffect(() => console.log(count.value));
// -> logs 0

setTimeout(() => {
  count.value++;
  // -> logs 1
}, 100);

const stop = watchEffect(() => {
  /* ... */
});

// later
stop();

watchEffect((onInvalidate) => {
  const token = performAsyncOperation(id.value);
  onInvalidate(() => {
    // id has changed or watcher is stopped.
    // id 已更改 / watch 被停止侦听
    // invalidate previously pending async operation
    // 之前的未结束的异步操作 (ajax 请求) 需要使其失效
    token.cancel();
  });
});

watchEffect(
  () => {
    /* 副作用 */
  },
  {
    onTrigger(e) {
      debugger;
    }
  }
);
</script>
