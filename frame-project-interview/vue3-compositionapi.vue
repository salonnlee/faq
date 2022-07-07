<template>
  <p>mouse position: {{ x }} , {{ y }}</p>
</template>

<script>
import useMousePosition from "./useMousePosition";

export default {
  name: "MousePosition",
  setup() {
    const { x, y } = useMousePosition();

    return { x, y };
  }
};
</script>

<script>
import { ref, onMounted, onUnmounted } from "vue";

function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  function update(e) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    window.addEventListener("mousemove", update);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });

  return { x, y };
}
</script>
