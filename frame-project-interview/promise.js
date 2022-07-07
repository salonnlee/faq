let PromiseO;

(() => {
  PromiseO = Promise;
})();

(() => {
  const PENDING = "pending";
  const FULFILLED = "fulfilled";
  const REJECTED = "rejected";

  class Promise {
    state = PENDING; // Promise 状态 ( pending | fulfilled | rejected)

    value = null;
    reason = null;

    resolveCallbackList = [];
    rejectCallbackList = [];

    constructor(executor) {
      rejectTryCatch(() => {
        // executor 执行器函数, 立即执行
        executor(this.resolve, this.reject);
      }, this.reject);
    }

    resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        while (this.resolveCallbackList.length) {
          this.resolveCallbackList.shift()(this.value);
        }
      }
    };
    reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        while (this.rejectCallbackList.length) {
          this.rejectCallbackList.shift()(this.reason);
        }
      }
    };

    then = (resolveCallback, rejectCallback) => {
      resolveCallback =
        typeof resolveCallback === "function"
          ? resolveCallback
          : (value) => value;
      rejectCallback =
        typeof rejectCallback === "function"
          ? rejectCallback
          : (reason) => {
              throw reason;
            };

      const nextPromise = new Promise((resolve, reject) => {
        const resolveCallbackEnhanced = () => {
          // 微任务是为了等待 nextPromise 完成初始化
          queueMicrotask(() => {
            rejectTryCatch(() => {
              const nextValue = resolveCallback(this.value);
              resolvePromise(nextPromise, nextValue, resolve, reject);
            }, reject);
          });
        };
        const rejectCallbackEnhanced = () => {
          queueMicrotask(() => {
            rejectTryCatch(() => {
              const nextReason = rejectCallback(this.reason);
              resolvePromise(nextPromise, nextReason, resolve, reject);
            }, reject);
          });
        };

        if (this.state === FULFILLED) {
          resolveCallbackEnhanced();
        } else if (this.state === REJECTED) {
          rejectCallbackEnhanced();
        } else if (this.state === PENDING) {
          this.resolveCallbackList.push(resolveCallbackEnhanced);
          this.rejectCallbackList.push(rejectCallbackEnhanced);
        }
      });
      // 链式调用
      return nextPromise;
    };
  }

  Promise.resolve = function (value) {
    if (value instanceof Promise) {
      return value;
    }
    return new Promise((resolve) => resolve(value));
  };
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => reject(reason));
  };
  Promise.all = function (promises = []) {
    return new Promise((resolve, reject) => {
      const results = [];
      let resolvedCount = 0;

      promises.forEach((promise) => {
        promise
          .then((value) => {
            results.push(value);
            resolvedCount++;
            if (resolvedCount === promises.length) {
              resolve(results);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  };
  Promise.race = function (promises = []) {
    let isResolved = false;
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        promise
          .then((value) => {
            if (!isResolved) {
              resolve(value);
              isResolved = true;
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  };

  function rejectTryCatch(fn, reject) {
    try {
      fn();
    } catch (error) {
      reject(error);
    }
  }

  function resolvePromise(nextPromise, nextValue, resolve, reject) {
    // 判断返回值是否是自身
    if (nextPromise === nextValue) {
      return reject(
        new TypeError("Chaining cycle detected for promise #<Promise>")
      );
    }
    // 判断返回值是否是 Promise
    if (nextValue instanceof Promise) {
      nextValue.then(resolve, reject);
    } else {
      resolve(nextValue);
    }
  }
})();
