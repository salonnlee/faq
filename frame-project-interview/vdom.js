// import { h } from "snabbdom";

// const vnode = h("div", { style: { color: "#000" } }, [
//   h("h1", "Headline"),
//   h("p", "A paragraph")
// ]);

const patch = init([
  // 初始化 `patch` 函数, 模块化引入扩展功能
  classModule, // 类名模块
  propsModule, // props 模块
  styleModule, // 样式模块
  eventListenersModule // 事件监听模块
]);

const container = document.getElementById("container");

const vnode = h("div#container.two.classes", { on: { click: someFn } }, [
  h("span", { style: { fontWeight: "bold" } }, "This is bold"),
  " and this is just normal text",
  h("a", { props: { href: "/foo" } }, "I'll take you places!")
]);
// 调用 `patch` 首次渲染
patch(container, vnode); // 将虚拟 DOM 节点 vnode 真正渲染到 HTML 页面上

const newVnode = h(
  "div#container.two.classes",
  { on: { click: anotherEventHandler } },
  [
    h(
      "span",
      { style: { fontWeight: "normal", fontStyle: "italic" } },
      "This is now italic type"
    ),
    " and this is still just normal text",
    h("a", { props: { href: "/bar" } }, "I'll take you places!")
  ]
);
// 再次调用 `patch`
patch(vnode, newVnode); // 将旧节点更新为新节点
