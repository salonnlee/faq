// obj.method(); // => this = obj

// const method = obj.method;
// method(); // => this = window || undefined

// const method = obj.method;
// method.bind(obj)(); // => this = obj

class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("Click happened");
  }
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}

class Foo extends Component {
  // Note: this syntax is experimental and not standardized yet.
  handleClick = () => {
    console.log("Click happened");
  };
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}

class Foo extends Component {
  handleClick() {
    console.log("Click happened");
  }
  render() {
    return <button onClick={this.handleClick.bind(this)}>Click Me</button>;
  }
}

class Foo extends Component {
  handleClick() {
    console.log("Click happened");
  }
  render() {
    return <button onClick={() => this.handleClick()}>Click Me</button>;
  }
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("提交的名字: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

<input type="file" ref={this.fileInputRef} />;

this.fileInputRef = React.createRef();

function getFileInputFile() {
  const elm = this.fileInputRef.current;
  const file = elm.files[0];
  return file;
}

this.setState((prevState, props) => {
  return { count: prevState.count + 1 };
});

function shouldComponentUpdate(nextProps, nextState) {
  if (nextState.count === this.state.count) {
    return false;
  }
  return true;
}

state.count = state.count + 1;
this.setState({
  count: state.count
});

// nextState.count === this.state.count 永远是 true

this.state = { count: 0 };

this.setState({ count: this.state.count + 1 });
this.setState({ count: this.state.count + 1 });
this.setState({ count: this.state.count + 1 });
// => this.state.count = 1 => 被合并

this.setState((prevState, props) => {
  return { count: prevState.count + 1 };
});
this.setState((prevState, props) => {
  return { count: prevState.count + 1 };
});
this.setState((prevState, props) => {
  return { count: prevState.count + 1 };
});
// => this.state.count = 3 => 不会被合并
