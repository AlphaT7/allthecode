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
  if ($("#container").dataset.flag == "false") {
    $("#container").classList.add("container_reveal");
    $("#container").dataset.flag = true;
  } else {
    $("#container").classList.remove("container_reveal");
    $("#container").dataset.flag = false;
  }
});

$("#choosegame").addEventListener("change", function() {
  if ($("#choosegame").value == "1") {
    $("#startgame").style.display = "block";
    $("#joingame").style.display = "none";
  } else {
    $("#startgame").style.display = "none";
    $("#joingame").style.display = "block";
  }
});
