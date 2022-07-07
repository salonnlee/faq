<script>
_createElementBlock(
  "span",
  null,
  "Hello, I'm " + _toDisplayString(_ctx.name) + "!",
  1 /* TEXT */
);

_createElementVNode(
  "h1",
  {
    class: _normalizeClass(_ctx.titleClasses)
  },
  "Vue 3",
  2 /* CLASS */
);

_createVNode(
  _component_MyComponent,
  {
    foo: _ctx.fooProp,
    bar: _ctx.barProp
  },
  null,
  8 /* PROPS */,
  ["foo", "bar"]
);

function sameVnode(vnode1, vnode2) {
  // tag 标签, key 键值和 patchFlag 静态标记三者都相同, 则认为是相同节点
  return (
    vnode1.key === vnode2.key &&
    vnode1.sel === vnode2.sel &&
    vnode1.patchFlag === vnode2.patchFlag
  );
}

const _hoisted_1 = /*#__PURE__*/ _createElementVNode(
  "p",
  null,
  "Hello World! 1",
  -1 /* HOISTED */
);
const _hoisted_2 = /*#__PURE__*/ _createElementVNode(
  "p",
  null,
  "Hello World! 2",
  -1 /* HOISTED */
);
const _hoisted_3 = /*#__PURE__*/ _createElementVNode(
  "p",
  null,
  "Hello World! 3",
  -1 /* HOISTED */
);

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _hoisted_1,
        _hoisted_2,
        _hoisted_3,
        _createElementVNode(
          "span",
          null,
          "Hello, I'm " + _toDisplayString(_ctx.name) + "!",
          1 /* TEXT */
        )
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}

const _hoisted_1 = /*#__PURE__*/ _createStaticVNode(
  "<p>Hello World! 1</p><p>Hello World! 2</p>...<p>Hello World! 100</p>",
  100
);

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _hoisted_1,
        _createElementVNode(
          "span",
          null,
          "Hello, I'm " + _toDisplayString(_ctx.name) + "!",
          1 /* TEXT */
        )
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      "button",
      {
        onClick:
          _cache[0] ||
          (_cache[0] = (...args) =>
            _ctx.handleButtonClick && _ctx.handleButtonClick(...args))
      },
      "Click me!"
    )
  );
}

export function ssrRender(
  _ctx,
  _push,
  _parent,
  _attrs,
  $props,
  $setup,
  $data,
  $options
) {
  const _cssVars = { style: { color: _ctx.color } };
  _push(
    `<!--[--><p${_ssrRenderAttrs(
      _cssVars
    )}>Hello World! 1</p><p${_ssrRenderAttrs(
      _cssVars
    )}>Hello World! 2</p><p${_ssrRenderAttrs(
      _cssVars
    )}>Hello World! 3</p><span${_ssrRenderAttrs(
      _cssVars
    )}>Hello, I&#39;m ${_ssrInterpolate(_ctx.name)}!</span><!--]-->`
  );
}

import {
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from "vue";

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock("p", null, "Hello World!");
}

import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  normalizeClass as _normalizeClass,
  resolveComponent as _resolveComponent,
  createVNode as _createVNode,
  Fragment as _Fragment,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock
} from "vue";

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MyComponent = _resolveComponent("MyComponent");

  return (
    _openBlock(),
    _createElementBlock(
      _Fragment,
      null,
      [
        _createElementVNode(
          "span",
          null,
          "Hello, I'm " + _toDisplayString(_ctx.name) + "!",
          1 /* TEXT */
        ),
        _createElementVNode(
          "h1",
          {
            class: _normalizeClass(_ctx.titleClasses)
          },
          "Vue 3",
          2 /* CLASS */
        ),
        _createVNode(
          _component_MyComponent,
          {
            foo: _ctx.fooProp,
            bar: _ctx.barProp
          },
          null,
          8 /* PROPS */,
          ["foo", "bar"]
        )
      ],
      64 /* STABLE_FRAGMENT */
    )
  );
}
</script>
