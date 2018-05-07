const $ = q => {
  return document.querySelector(q);
};

let webworker = new Worker("javascripts/webworker.js");
webworker.postMessage("a message");
webworker.onmessage = function(e) {
  console.log(e.data);
};
