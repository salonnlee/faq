// 3s 把 div 宽度从 100px 变成 460px
// (60帧/s => 3s 180帧 => 每次增加 2px)
const $div = $("#div");
let curWidth = 100;
const maxWidth = 460;

// setTimeout
function animateWithSetTimeout() {
  curWidth = curWidth + 2;
  $div.css("width", curWidth);
  if (curWidth < maxWidth) {
    setTimeout(animateWithSetTimeout, 16.7); // 需要自己控制 16.67ms 更新一次视图
  }
}
animateWithSetTimeout();

// RAF
function animateWithRAF() {
  curWidth = curWidth + 2;
  $div.css("width", curWidth);
  if (curWidth < maxWidth) {
    window.requestAnimationFrame(animateWithRAF); // 浏览器自动控制
  }
}
animateWithRAF();
