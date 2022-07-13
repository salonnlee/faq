// 四则运算
const operatorMap = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "^": 2,
  "%": 2
};

// 中缀表达式转逆波兰表达式
const convert = (inputArr = []) => {
  if (inputArr.length === 0) return [];

  const ops = [];
  const outputs = [];

  const n = inputArr.length;
  for (let i = 0; i < n; i++) {
    const elem = inputArr[i];
    if (/\d/.test(elem)) {
      outputs.push(elem);
      while (i + 1 < inputArr.length && /\d/.test(inputArr[i + 1])) {
        outputs[outputs.length - 1] += inputArr[i + 1];
        i++;
      }
    } else if (elem === "(" || elem === "[" || elem === "{") {
      // 入栈 操作符
      ops.push("(");
      if (inputArr[i + 1] === "-" || inputArr[i + 1] === "+") {
        outputs.push("0");
      }
    } else if (elem === ")" || elem === "]" || elem === "}") {
      while (ops.length) {
        const op = ops.pop();
        if (op === "(") break;
        outputs.push(op);
      }
    } else {
      // 如果是正常运算符
      while (ops.length >= 0) {
        const topOp = ops[ops.length - 1];
        // 如果运算符栈为空，或顶部运算符是 '(' ，亦或当前运算符优先级比栈顶优先级高
        if (
          ops.length === 0 ||
          topOp === "(" ||
          operatorMap[elem] > operatorMap[topOp]
        ) {
          ops.push(elem);
          break;
        } else {
          // 不然，就应该计算当前输出结果
          outputs.push(ops.pop());
        }
      }
    }
  }
  // 循环结束，如果运算符栈不为空，则添加到输出结果栈
  while (ops.length) {
    outputs.push(ops.pop());
  }
  return outputs;
};

const compute = (left, right, op) => {
  switch (op) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "^":
      return left ** right;
    default:
      throw Error("bad oprator:" + op);
  }
};

const calc = (strArr = []) => {
  if (!Array.isArray(strArr) || strArr.length === 0) return 0;
  const tempArr = [];

  strArr.forEach((key) => {
    if (/\d/.test(key)) {
      tempArr.push(key);
    } else {
      // 运算符
      const left = ~~tempArr.pop();
      const right = ~~tempArr.pop();
      if (isNaN(left) || isNaN(right)) {
        throw Error(`无效表达式: ${strArr.join(",")}`);
      }
      tempArr.push(compute(right, left, key));
    }
  });
  return ~~tempArr[0];
};
const input = readline();
const strArr = convert([...input]);
console.log(calc(strArr));
