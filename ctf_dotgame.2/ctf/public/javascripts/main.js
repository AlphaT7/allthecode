const $ = q => {
  return document.querySelector(q);
};

let webworker = new Worker("javascripts/webworker.js");
webworker.postMessage("a message");
webworker.onmessage = function(e) {
  console.log(e.data);
};

$("#canvas").width = "800";
$("#canvas").height = "800";

$("#btn_menu").addEventListener("click", function() {
  $("#menu").classList.add("menu_reveal");
  $("#container").classList.add("container_reveal");
});
