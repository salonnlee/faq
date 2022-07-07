with (console) {
  log('I dont need the "console." part anymore!');
}

const compiler = require("vue-template-compiler");

const template = "<p>{{message}}</p>";
// with(this) { return _c("p", [_v(_s(message))]); }
// _c = createElement, _v = createTextVNode, _s = toString, return vnode

const { render } = compiler.compile(template);
// render = function () { with(this) { ... } }

Vue.component("heading", {
  render: function (createElement) {
    return createElement("h" + this.level, [ // <= template: "./components/Heading.vue"
      createElement(
        "a",
        { attrs: { name: headId, href: "#" + headId } },
        "this is a head tag"
      )
    ]);
  }
});
