[].reduce(
  (callback = (
    previousValue, // 累加值
    currentValue, // 当前值
    currentIndex, // 当前索引
    array // 源数组
  ) => {}),
  initialValue // 初始值
);

Array.prototype.reduceMap = function (callback) {
  return this.reduce((acc, cur, index, array) => {
    const item = callback(cur, index, array);
    acc.push(item);
    return acc;
  }, []);
};

Array.prototype.reduceForEach = function (callback) {
  this.reduce((acc, cur, index, array) => {
    callback(cur, index, array);
  }, []);
};

Array.prototype.reduceFilter = function (callback) {
  return this.reduce((acc, cur, index, array) => {
    if (callback(cur, index, array)) {
      acc.push(cur);
    }
    return acc;
  }, []);
};
