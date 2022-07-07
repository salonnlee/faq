function bindEvent(
  element,
  event,
  fn,
  selector = null /* 代理绑定 */,
  useCapture = false /* 是否在事件捕获阶段执行 */
) {
  return element.addEventListener(
    event,
    (ev) => {
      const target = ev.target; // 触发事件元素
      if (!selector) {
        fn.call(target, ev);
      } else {
        // 代理绑定
        let el = target;
        while (!el.matches(selector)) {
          if (element === el) {
            el = null;
            break;
          }
          el = el.parentNode; // 当触发事件元素不是代理元素时, 往上级寻找
        }
        el && fn.call(el, ev);
      }
    },
    useCapture
  );
}

bindEvent(document.getElementById("btn"), "click", (event) => {
  const target = event.target; // 触发事件元素
  const currentTarget = event.currentTarget; // 绑定事件元素
  event.preventDefault(); // 阻止默认行为
  event.stopPropagation(); // 阻止冒泡 / 阻止捕获
  return false; // 阻止默认行为 + (阻止冒泡 / 阻止捕获)
});

function delegateBindEvent(element, event, selector, fn) {
  element.addEventListener(event, (e) => {
    let el = e.target;
    while (!el.matches(selector)) {
      if (element === el) {
        el = null;
        break;
      }
      el = el.parentNode;
    }
    el && fn.call(el, e, el);
  });
  return element;
}
