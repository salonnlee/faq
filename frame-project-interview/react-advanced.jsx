function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Context 可以让我们无须明确地传遍每一个组件, 就能将值深入传递进组件树

// 为当前的 theme 创建一个 context ("light" 为默认值)
const ThemeContext = React.createContext("light");

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给组件树
    // 无论多深, 任何组件都能读取这个值
    // 我们将 "dark" 作为当前 theme 的值传递下去
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必声明接收并往下传递 theme
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context
  // React 会往上找到最近的 theme Provider 然后使用它的值
  // 找到当前的 theme 值为 "dark"
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}

import("./math").then((math) => {
  console.log(math.add(16, 26));
});

import React, { Suspense } from "react";

const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}

function shouldComponentUpdate(nextProps, nextState) {
  if (
    !shallowEqual(this.props, nextProps) ||
    !shallowEqual(this.state, nextState)
  ) {
    return true;
  }
  return false;
}

const hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
    如果把 nextProps 传入 render 方法的返回结果与
    将 prevProps 传入 render 方法的返回结果一致则返回 true，
    否则返回 false
    */
}
export default React.memo(MyComponent, areEqual);

// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        // DataSource 是全局范围内的数据源变量
        // selectData 函数通过 DataSource 数据源和 props 返回我们需要的数据
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // 订阅更改
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      // 取消订阅
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      // 当数据源更新时, 更新组件状态
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // 使用 selectData 返回的新数据渲染被包装的组件
      // props 属性透传
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);

<DataProvider render={(data) => <h1>Hello, {data.name}!</h1>} />;

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        {/* 使用 `render` prop 动态决定要渲染的内容 */}
        {/* 而不是给出一个 <Mouse> 渲染结果的静态表示 */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src="/cat.jpg"
        style={{ position: "absolute", left: mouse.x, top: mouse.y }}
      />
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={(mouse) => <Cat mouse={mouse} />} />
      </div>
    );
  }
}
