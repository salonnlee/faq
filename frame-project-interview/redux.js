import { createStore } from "redux";

/**
 * reducer 函数的形式是 (state, action) => newState 的纯函数
 * 描述了 action 如何把 state 转变成新的 state
 */
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// 创建 Redux store 来存放应用的状态
// API 是 { subscribe, dispatch, getState }
let store = createStore(counter);

// 可以手动订阅更新, 也可以通过事件绑定到视图层
store.subscribe(() => console.log(store.getState()));

// 改变内部 state 唯一方法是 dispatch action
store.dispatch({ type: "INCREMENT" });
// 1
store.dispatch({ type: "INCREMENT" });
// 2
store.dispatch({ type: "DECREMENT" });
// 1

function todos(state = [], action) {
  // ...
  return nextState;
}

function visibleTodoFilter(state = "SHOW_ALL", action) {
  // ...
  return nextState;
}

let todoApp = combineReducers({
  todos,
  visibleTodoFilter
});

import React from "react";
import PropTypes from "prop-types";

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

// export default Todo;

import React from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

// export default TodoList;

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_COMPLETED":
      return todos.filter((t) => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter((t) => !t.completed);
    case "SHOW_ALL":
    default:
      return todos;
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

import { connect } from "react-redux";

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;

ReactDOM.render(
  <Provider store={store}>
    <MyRootComponent />
  </Provider>,
  rootEl
);

const request = { type: "FETCH_POSTS" };
const error = { type: "FETCH_POSTS", status: "error", error: "Oops" };
const success = { type: "FETCH_POSTS", status: "success", response: {} };

const r = { type: "FETCH_POSTS_REQUEST" };
const e = { type: "FETCH_POSTS_FAILURE", error: "Oops" };
const s = { type: "FETCH_POSTS_SUCCESS", response: {} };

// 可以像其它 action 函数一样使用 thunk action 函数:
// store.dispatch(fetchPosts('reactjs'))
export function fetchPosts(subreddit) {
  // Thunk middleware 知道如何处理函数
  // 这里把 dispatch 方法通过参数的形式传给函数
  // 以此来让函数自己也能 dispatch action
  return function (dispatch) {
    // 请求开始 action: 更新应用的 state 来通知 API 请求已发起
    dispatch({ type: "FETCH_POSTS_REQUEST", subreddit });

    // thunk middleware 调用的函数可以有返回值, 它会被当作 dispatch 方法的返回值传递
    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(
        (response) => response.json(),
        (error) => {
          // 请求失败 action: 将报错 error 抛出通知应用的 state
          dispatch({ type: "FETCH_POSTS_FAILURE", error });
        }
      )
      .then((json) =>
        // 请求成功 action: 使用 API 请求结果来更新应用的 state
        dispatch({ type: "FETCH_POSTS_SUCCESS", response: json })
      );
  };
}

import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware, 用来打印 action 日志
  )
);
