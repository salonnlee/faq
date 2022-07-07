const imageElement = (
  <div className="image-container">
    <img src={imgUrl} />
    <p>Image Description</p>
  </div>
);

// jsx compiled
const imageElement = React.createElement(
  "div",
  { className: "image-container" },
  React.createElement("img", { src: imgUrl }),
  React.createElement("p", null, "Image Description")
);

class ListDemo {
  increase = () => {
    // 开始 batchUpdate
    // isBatchUpdates = true
    // 此时处于 batchUpdate 中, isBatchUpdates 是 true
    this.setState({
      count: this.state.count + 1
    });
    // isBatchUpdates = false
    // 结束 batchUpdate
  };
}

class ListDemo {
  increase = () => {
    // 开始 batchUpdate
    // isBatchUpdates = true
    setTimeout(() => {
      // 此时 isBatchUpdates 是 false
      this.setState({
        count: this.state.count + 1
      });
    });
    // isBatchUpdates = false
    // 结束 batchUpdate
  };
}
