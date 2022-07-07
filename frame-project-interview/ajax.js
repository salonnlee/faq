function ajax(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(xhr));
        }
      }
    };
    xhr.send(data);
  });
}

var xhr = new XMLHttpRequest();
console.log("UNSENT", xhr.readyState); // readyState = 0

xhr.open("GET", "/api", true);
console.log("OPENED", xhr.readyState); // readyState = 1

xhr.onprogress = function () {
  console.log("LOADING", xhr.readyState); // readyState = 3
};

xhr.onload = function () {
  console.log("DONE", xhr.readyState); // readyState = 4
};

xhr.send(null);
