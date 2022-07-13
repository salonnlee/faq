// 放苹果

// 解法1 递归
// let str;
// while ((str = readline())) {
//   let [m, n] = str.split(" ");
//   print(fn(m, n));
// }

// function fn(m, n) {
//   if (m == 1 || n == 1) return 1;
//   else if (m < 0 || n <= 0) {
//     return 0;
//   } else return fn(m, n - 1) + fn(m - n, n);
// }

// 解法2 dp
let str;
while ((str = readline())) {
  let [m, n] = str.split(" ").map(Number);
  // dp[m][n] 表示为将m个苹果放入n个盘子中的摆放方法总数
  let dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    dp[0][i] = 1; //0个苹果，一种放法
    dp[1][i] = 1; //1个苹果，一种放法
  }
  for (let i = 0; i <= m; i++) {
    dp[i][0] = 1;
    dp[i][1] = 1;
  }
  for (let i = 2; i <= m; i++) {
    for (let j = 2; j <= n; j++) {
      dp[i][j] = dp[i][j - 1] + (i >= j ? dp[i - j][j] : 0);
    }
  }
  print(dp[m][n]);
}
