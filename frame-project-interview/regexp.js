// const regex = /\d{2,5}?/g; // /\d{2,5}?/g
// const string = "123 1234 12345 123456";
// console.log(string.match(regex));
// => [ '123', '1234', '12345', '12345' ]
// ? => [ '12', '12', '34', '12', '34', '12', '34', '56' ]

// const regex = /good|nice/g;
// const str = "good idea, nice try.";
// console.log(str.match(regex));
// => [ "good", "nice" ]

// const regex = /good|goodbye/g;
// const str = "goodbye";
// console.log(str.match(regex));
// => ["good"]

// const regex = /id="[^"]*"/;
// const str = '<div id="container" class="main"></div>';
// console.log(str.match(regex)[0]);
// => id="container"

// const str = "I\nlove\nJavaScript!";
// console.log(str.replace(/^|$/gm, "#"));
/**
 * #I#
 * #love#
 * #JavaScript!#
 */

// const str = "[JS] Lesson_01.mp4";
// console.log(str.replace(/\b/g, "#"));
// => [#JS#] #Lesson_01#.#mp4#
// \B => #[J#S]# L#e#s#s#o#n#_#0#1.m#p#4

// const str = "hello";
// console.log(str.replace(/(?=l)/g, "#"));
// => he#l#lo
// ?!l => #h#ell#o#

// const str = "12345678";
// console.log(str.replace(/(?=\d{3}$)/g, ","));
// => 12345,678
// const str = "123456789";
// console.log(str.replace(/(?=(\d{3})+$)/g, ","));
// => ,123,456,789
// const str = "123456789";
// console.log(str.replace(/(?!^)(?=(\d{3})+$)/g, ","));
// => 123,456,789

// const regex = /^I love (JavaScript|Regular Expression)$/;
// console.log(regex.test("I love JavaScript"));
// console.log(regex.test("I love Regular Expression"));
// => true
// => true

// const regex = /(\d{4})-(\d{2})-(\d{2})/;
// const str = "Today is 2022-06-08!";
// console.log(str.match(regex));
// // => ["2022-06-08", "2022", "06", "08", index: 9, input: "Today is 2022-06-08!", groups: undefined]
// console.log(RegExp.$1); // "2022"
// console.log(RegExp.$2); // "06"
// console.log(RegExp.$3); // "08"

// const regex = /(\d{4})-(\d{2})-(\d{2})/;
// const str = "Today is 2022-06-08!";
// console.log(str.replace(regex, "$2/$3/$1"));
// => "Today is 06/08/2022!"

// const regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
// const str1 = "2022-06-08";
// const str2 = "2022/06/08";
// const str3 = "2022.06.08";
// const str4 = "2022-06/08";
// console.log(regex.test(str1)); // true
// console.log(regex.test(str2)); // true
// console.log(regex.test(str3)); // true
// console.log(regex.test(str4)); // false

// const regex = /(\d)+/;
// const str = "12345";
// console.log(str.match(regex));
// => [ "12345", "5", index: 0, input: "12345", groups: undefined ]

// const regex = /(\d)+ \1/;
// console.log(regex.test("12345 1"));
// // => false
// console.log(regex.test("12345 5"));
// // => true

// const regex = /(?:\d)+/;
// const str = "12345";
// console.log(str.match(regex));
// => [ "12345", index: 0, input: "12345", groups: undefined ]

// function trim(str) {
//   return str.replace(/^\s+|\s+$/g, "");
// }
// console.log(trim("  foobar   "));
// => "foobar"

// function titleize(str) {
//   return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
//     return c.toUpperCase();
//   });
// }
// console.log(titleize("my name is kevin"));
// => "My Name Is Kevin"

// function camelize(str) {
//   return str.replace(/[-_\s]+(.)?/g, function (match, c) {
//     return c ? c.toUpperCase() : "";
//   });
// }
// console.log(camelize("-moz-transform"));
// => "MozTransform"

// function dasherize(str) {
//   return str
//     .replace(/([A-Z])/g, "-$1")
//     .replace(/[-_\s]+/g, "-")
//     .toLowerCase();
// }
// console.log(dasherize("MozTransform"));
// => "-moz-transform"

// 将HTML特殊字符转换成等值的实体
// function escapeHTML(str) {
//   var escapeChars = {
//     "<": "lt",
//     ">": "gt",
//     '"': "quot",
//     "&": "amp",
//     "'": "#39"
//   };
//   return str.replace(
//     new RegExp("[" + Object.keys(escapeChars).join("") + "]", "g"),
//     function (match) {
//       return "&" + escapeChars[match] + ";";
//     }
//   );
// }
// console.log(escapeHTML("<div>Blah blah blah</div>"));
// => "&lt;div&gt;Blah blah blah&lt;/div&gt";

// 实体字符转换为等值的HTML。
// function unescapeHTML(str) {
//   var htmlEntities = {
//     nbsp: " ",
//     lt: "<",
//     gt: ">",
//     quot: '"',
//     amp: "&",
//     apos: "'"
//   };
//   return str.replace(/\&([^;]+);/g, function (match, key) {
//     if (key in htmlEntities) {
//       return htmlEntities[key];
//     }
//     return match;
//   });
// }
// console.log(unescapeHTML("&lt;div&gt;Blah blah blah&lt;/div&gt;"));
// => "<div>Blah blah blah</div>"

// const regex = /<([^>]+)>[\d\D]*?<\/\1>/;
// const str1 = "<title>regular expression</title>";
// const str2 = "<p>kevin bye bye</p>";
// const str3 = "<title>wrong!</p>";
// console.log(regex.test(str1)); // true
// console.log(regex.test(str2)); // true
// console.log(regex.test(str3)); // false

// const str = "12345";
// const regex = /(\d{1,3})(\d{1,3})/;
// console.log(str.match(regex));
// => [ "12345", "123", "45", index: 0, input: "12345", groups: undefined ]

// const str = "12345";
// const regex = /^(\d{1,3}?)(\d{1,3})$/;
// console.log(str.match(regex));
// => [ "12345", "12", "345", index: 0, input: "12345", groups: undefined ]

// const str = "candy";
// const regex = /^(?:can|candy)$/;
// console.log(str.match(regex));
// => [ "candy", index: 0, input: "candy", groups: undefined ]

// const str = "^$.*+?|\\/[]{}=!:-,";
// const regex = /\^\$\.\*\+\?\|\\\/\[\]\{\}\=\!\:\-\,/;
// console.log(regex.test(str));
// => true

// const regex = /^(0\d{2,3}-?|\(0\d{2,3}\))[1-9]\d{6,7}$/;
// const str1 = "055188888888";
// const str2 = "0551-88888888";
// const str3 = "(0551)88888888";
// console.log(regex.test(str1)); // true
// console.log(regex.test(str2)); // true
// console.log(regex.test(str3)); // true

// const regex = /\d/;
// const str = "abc123";
// console.log(!!~str.search(regex));
// // => true

// console.log(str.search(regex));
// // => 3
// // "abc" => -1

// const regex = /\d/;
// const str = "abc123";
// console.log(regex.test(str));
// // => true

// const regex = /\d/;
// const str = "abc123";
// console.log(!!str.match(regex));
// // => true

// console.log(str.match(regex))
// // => [ "1", index: 3, input: "abc123", groups: undefined ]
// // "abc" => null

// const regex = /\d/;
// const str = "abc123";
// console.log(!!regex.exec(str));
// // => true

// console.log(regex.exec(str))
// // => [ "1", index: 3, input: "abc123", groups: undefined ]
// // "abc" => null

// const regex = /,/;
// const str = "html,css,javascript";
// console.log(str.split(regex));
// // => [ "html", "css", "javascript" ]

// const regex = /\D/;
// console.log("2022/06/08".split(regex));
// console.log("2022.06.08".split(regex));
// console.log("2022-06-08".split(regex));
// // => [ "2022", "06", "08" ]
// // => [ "2022", "06", "08" ]
// // => [ "2022", "06", "08" ]

// const regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
// const str = "2022-06-08";
// console.log(str.match(regex));
// // => [ "2022-06-08", "2022", "06", "08", index: 0, input: "2022-06-08", groups: undefined ]

// const regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
// const str = "2022-06-08";
// console.log(regex.exec(str));
// // => [ "2022-06-08", "2022", "06", "08", index: 0, input: "2022-06-08", groups: undefined ]

// const regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
// const str = "2022-06-08";
// regex.test(str);
// console.log(RegExp.$1, RegExp.$2, RegExp.$3);
// // => "2022" "06" "08"

// const regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
// const str = "2022-06-08";
// str.search(regex);
// console.log(RegExp.$1, RegExp.$2, RegExp.$3);
// // => "2022" "06" "08"

// const regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
// const str = "2022-06-08";
// str.replace(regex, function (match, $1, $2, $3) {
//   console.log($1, $2, $3);
//   return match;
// });
// // => "2022" "06" "08"

// const str = "2022-06-08";
// console.log(str.replace(/^(\d{4})\D(\d{2})\D(\d{2})$/, "$2/$3/$1"));
// // => "06/08/2022"

// const str = "2022.06.08";
// console.log(str.search("."));
// // => 0
// //需要修改成
// console.log(str.search("\\."));
// console.log(str.search(/\./));
// // => 4
// // => 4

// console.log(str.match("."));
// // => [ "2", index: 0, input: "2022.06.08" ]
// //需要修改成
// console.log(str.match("\\."));
// console.log(str.match(/\./));
// // => [ ".", index: 4, input: "2022.06.08" ]
// // => [ ".", index: 4, input: "2022.06.08" ]

// console.log(str.split("."));
// // => [ "2022", "06", "08" ]

// console.log(str.replace(".", "/"));
// // => "2022/06.08"

// const str = "2022.06.08";
// const regex1 = /\b(\d+)\b/;
// const regex2 = /\b(\d+)\b/g;
// console.log(str.match(regex1));
// console.log(str.match(regex2));
// // => [ "2022", "2022", index: 0, input: "2022.06.08" ]
// // => [ "2022", "06", "08" ]

// const str = "2022.06.08";
// const regex2 = /\b(\d+)\b/g;
// console.log(regex2.exec(str));
// console.log(regex2.lastIndex);
// console.log(regex2.exec(str));
// console.log(regex2.lastIndex);
// console.log(regex2.exec(str));
// console.log(regex2.lastIndex);
// console.log(regex2.exec(str));
// console.log(regex2.lastIndex);
// // => ["2022", "2022", index: 0, input: "2022.06.08"]
// // => 4
// // => ["06", "06", index: 5, input: "2022.06.08"]
// // => 7
// // => ["08", "08", index: 8, input: "2022.06.08"]
// // => 10
// // => null
// // => 0

// const regex = /a/g;
// console.log(regex.test("a"), regex.lastIndex);
// console.log(regex.test("aba"), regex.lastIndex);
// console.log(regex.test("ababc"), regex.lastIndex);
// // => true 1
// // => true 3
// // => false 0

// const result = "2,3,5".replace(/(\d+),(\d+),(\d+)/, "$1+$2=$3");
// console.log(result);
// // => "2+3=5"

// const result = "2,3,5".replace(/(\d+)/g, "$&$&$&");
// console.log(result);
// // => "222,333,555"

// const result = "2+3=5".replace(/=/, "$&($`)$&($')$&");
// console.log(result);
// // => "2+3=(2+3)=(5)=5"

// const regex = /\w/gim;
// console.log(regex.global);
// console.log(regex.ignoreCase);
// console.log(regex.multiline);
// // => true
// // => true
// // => true

// const className = "high";
// const regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
// console.log(regex.source);
// // => (^|\s)high(\s|$)

const regex = /([abc])(\d)/g;
const str = "a1b2c3d4e5";
str.match(regex);

console.log(RegExp.input);
console.log(RegExp["$_"]);
// => "a1b2c3d4e5"

console.log(RegExp.lastMatch);
console.log(RegExp["$&"]);
// => "c3"

console.log(RegExp.lastParen);
console.log(RegExp["$+"]);
// => "3"

console.log(RegExp.leftContext);
console.log(RegExp["$`"]);
// => "a1b2"

console.log(RegExp.rightContext);
console.log(RegExp["$'"]);
// => "d4e5"
