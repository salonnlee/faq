import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useReducer,
  useMemo,
  useCallback
} from "react";

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount
  useEffect(() => {
    console.log("componentDidMount!");

    // componentWillUnmount
    return () => {
      console.log("componentWillUnmount!");
    };
  }, []);

  // componentDidUpdate
  // 不传入数组则默认监听所有属性更新
  useEffect(() => {
    console.log("componentDidUpdate!");
  });
  useEffect(() => {
    console.log("componentDidUpdate!");
    console.log("count update!");
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

const refContainer = useRef(initialValue);

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的 input 元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

const value = useContext(MyContext);

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}

// const [state, dispatch] = useReducer(reducer, initializerArg, initializer);

const initializeState = function (initialCount) {
  return { count: initialCount };
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, initializeState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  );
}

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);

const noop = () => {};

const useHover = (element) => {
  const [state, setState] = useState(false);

  const onMouseEnter = (originalOnMouseEnter) => (event) => {
    (originalOnMouseEnter || noop)(event);
    setState(true);
  };
  const onMouseLeave = (originalOnMouseLeave) => (event) => {
    (originalOnMouseLeave || noop)(event);
    setState(false);
  };

  if (typeof element === "function") {
    element = element(state);
  }

  const el = React.cloneElement(element, {
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave)
  });

  return [el, state];
};

import { useHover } from "react-use";

const Demo = () => {
  const element = (hovered) => <div>Hover me! {hovered && "Thanks!"}</div>;
  const [hoverable, hovered] = useHover(element);

  return (
    <div>
      {hoverable}
      <div>{hovered ? "HOVERED" : ""}</div>
    </div>
  );
};

function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState("Mary");

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState("Poppins");

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  // ...
}

// ------------
// 首次渲染
// ------------
useState("Mary"); // 1. 使用 'Mary' 初始化变量名为 name 的 state
useEffect(persistForm); // 2. 添加 effect 以保存 form 操作
useState("Poppins"); // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
useEffect(updateTitle); // 4. 添加 effect 以更新标题

// -------------
// 二次渲染
// -------------
useState("Mary"); // 1. 读取变量名为 name 的 state（参数被忽略）
useEffect(persistForm); // 2. 替换保存 form 的 effect
useState("Poppins"); // 3. 读取变量名为 surname 的 state（参数被忽略）
useEffect(updateTitle); // 4. 替换更新标题的 effect

// ...

useEffect(() => {
  console.log("oops.. I'm stuck in a loop and couldn't get out");
}, [obj, arr]);

function Demo1() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      console.log();
    });
  }, []);
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // useEffect [] 相当于 componentDidMount, 只在开始时执行一次
    // 此时的 count = 0, 并且困在闭包中, 不再能获取最新的 count 值
    console.log("useEffect []");
    console.log("count is", count); // 0
    const timer = setInterval(() => {
      console.log("setInterval..");
      console.log("count is", count); // 0 -> 0 -> 0 -> ...
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // useEffect 相当于 componentDidUpdate, 开始时和更新时都重新执行
    // count 不再恒等于 0, 每次重新执行获取最新的 count 值
    console.log("useEffect []");
    console.log("count is", count); // 0
    const timer = setInterval(() => {
      console.log("setInterval..");
      console.log("count is", count); // 0 -> 1 -> 2 -> ...
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  );
}
