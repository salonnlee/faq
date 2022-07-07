// hash.js
window.onhashchange = (event) => {
  console.log("old url", event.oldURL);
  console.log("new url", event.newURL);
  console.log("hash:", location.hash);
};

// onpopstate 监听浏览器的前进后退
window.onpopstate = (event) => {
  console.log("onpopstate", event.state, location.pathname);
};

// pushState 不会导致浏览器页面刷新
history.pushState({ name: "loginPage" }, "", "login");
