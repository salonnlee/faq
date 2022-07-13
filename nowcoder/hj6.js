// 质数因子
const line = readline();

function getPrimeFactors(n) {
  if (n === 1) return []; // 1 没有质因子

  let pf = [];
  let i = 2;

  while (i * i <= n) {
    if (n % i === 0) {
      pf.push(i);
      n /= i;
      i = 2;
    } else {
      i++;
    }
  }

  if (n !== 1) {
    pf.push(n); // 质数的质因子只有它本身
  }

  return pf;
}

console.log(getPrimeFactors(line).join(" "));
