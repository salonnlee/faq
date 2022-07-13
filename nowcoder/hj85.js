// 最长回文子串

const str = readline();

let max = 0;

for (let i = 0; i < str.length - 1; i++) {
  // 奇数对称
  if (str.charAt(i) == str.charAt(i + 1) && i < str.length) {
    let j = 1;
    while (
      i + j + 1 < str.length &&
      i - j >= 0 &&
      str.charAt(i - j) == str.charAt(i + 1 + j)
    ) {
      j++;
    }
    max = Math.max(max, j * 2);
  }
}

for (let i = 0; i < str.length; i++) {
  // 偶数对称
  let j = 1;
  while (
    i + j < str.length &&
    i - j >= 0 &&
    str.charAt(i - j) == str.charAt(i + j)
  ) {
    j++;
  }
  max = Math.max(max, j * 2 - 1);
}

console.log(max);
