// HJ1 字符串最后一个单词的长度
// https://www.nowcoder.com/practice/8c949ea5f36f422594b306a2300315da

// 描述
// 计算字符串最后一个单词的长度，单词以空格隔开，字符串长度小于5000。（注：字符串末尾不以空格为结尾）
// 输入描述：
// 输入一行，代表要计算的字符串，非空，长度小于5000。

// 输出描述：
// 输出一个整数，表示输入字符串最后一个单词的长度。

// 示例1
// 输入：hello nowcoder
// 输出：8
// 说明：最后一个单词为nowcoder，长度为8

const line = readline();

function getLastWordLength(str) {
  const result = str.trim().match(/\w+$/);
  return result ? result[0].length : 0;
}

console.log(getLastWordLength(line));
