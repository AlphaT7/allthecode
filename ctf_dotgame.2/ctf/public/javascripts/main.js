const $ = q => {
  return document.querySelector(q);
};
let db;
let webworker = new Worker("javascripts/webworker.js");
webworker.postMessage("a message");
webworker.onmessage = function(e) {
  switch (e.data.msgtype) {
    case "init":
      repaint(db);
      break;
    case "dbcreated":
      db = new Dexie("ctf");
      db.version(1).stores({
        //colors: "++id, color, description",
        goals: "++id,who,x,y",
        flags: "++id,who,x,y,src",
        goalboundries: "++id,who,x,y,w,h,c",
        dropboundry: "++id,x,y,w,h,c",
        dots: "++id,who,number,x,y,r,type,live",
        gameinfo: "++id,who,live,latency,gameroom,playername,opponentname"
      });
      break;
    case "gamelistupdate":
      $("#gamestojoin").innerHTML +=
        '<option value="' +
        e.data.gamename +
        '">' +
        e.data.gamename +
        "</option>";
      break;
    case "message":
      $("#messagebox").innerHTML = e.data.content;
      $("#messagebox").classList.add("blink");
      setTimeout(function() {
        $("#messagebox").classList.remove("blink");
      }, 3000);
      break;
    case "echogamelist":
      e.data.gamelist.forEach(element => {
        $("#gamestojoin").innerHTML +=
          "<option value='" +
          element.gameroom +
          "'>" +
          element.gameroom +
          "</option>";
      });
      break;
    case "gamelistremoval":
      for (var i = 0; i < $("#gamestojoin").length; i++) {
        if ($("#gamestojoin").options[i].value == e.data.gameroom)
          $("#gamestojoin").remove(i);
      }
      break;
    case "disableform":
      $("#formgroup").disabled = true;
      break;
    case "gamedata":
      db.gameinfo.get(1, function(info) {
        $("#opponent").innerHTML = info.opponentname;
      });
      $("#gamesetup").innerHTML = "Starting...";
      $("#gamesetup").classList.add("blink");
      setTimeout(function() {
        $("#gamesetup").classList.remove("blink");
        $("#gamesetup").innerHTML = "Live";
        $("#gamestatus").innerHTML = "Live";
        $("#container").classList.remove("container_reveal");
        $("#container").dataset.flag = false;
      }, 3000);
      break;
  }
};

$("#canvas").width = "700";
$("#canvas").height = "700";

$("#canvas").addEventListener("click", function(e) {
  alert("test");
});

$("#btn_menu").addEventListener("click", function() {
  if ($("#container").dataset.flag == "false") {
    $("#container").classList.add("container_reveal");
    $("#container").dataset.flag = true;
  } else {
    $("#container").classList.remove("container_reveal");
    $("#container").dataset.flag = false;
  }
});

$("#hostorjoin").addEventListener("change", function() {
  if ($("#hostorjoin").value == "host") {
    $("#startgame").style.display = "block";
    $("#newgame").required = true;
    $("#gamestojoin").required = false;
    $("#joingame").style.display = "none";
  } else {
    $("#startgame").style.display = "none";
    $("#newgame").required = false;
    $("#gamestojoin").required = true;
    $("#joingame").style.display = "block";
  }
});

$("#userinfo").addEventListener("submit", function(e) {
  e.preventDefault();

  let msg = {
    msgtype: "usersetup",
    gamesize: "",
    goalcount: "",
    username: "",
    gametype: "",
    newgame: "",
    joingame: "",
    gamesize: "",
    goalcount: ""
  };

  msg.gamesize = $("#gamesize").value;
  msg.goalcount = $("#goalcount").value;
  msg.username = $("#username").value;
  msg.gametype = $("#hostorjoin").value;
  msg.newgame = $("#newgame").value;
  msg.joingame = $("#gamestojoin").value;
  msg.gamesize = $("#gamesize").value;
  msg.goalcount = $("#goalcount").value;

  webworker.postMessage(msg);
});

function repaint() {
  db.gameinfo.get(1, function(info) {
    $("#showlatency").innerText = info.latency;
  });
  window.requestAnimationFrame(repaint);
}
