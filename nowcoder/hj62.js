// 查找输入整数二进制中1的个数
let n;

while ((n = readline())) {
  n = parseInt(n);
  let count = 0;

  while (n) {
    count += n & 1;
    n >>= 1;
  }

  console.log(count);
}
