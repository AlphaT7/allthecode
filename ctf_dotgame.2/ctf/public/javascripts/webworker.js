//importScripts("/socket.io/socket.io.js");
importScripts("dexie.min.js");

const db = new Dexie("ctf");
db.version(1).stores({
  //colors: "++id, color, description",
  goals: "++id,who,x,y",
  flags: "++id,who,x,y,src",
  goalboundry: "++id,who,x,y,w,h,c",
  dropboundry: "++id,x,y,w,h,c",
  dots: "++id,who,number,x,y,r,type,live",
  gameinfo: "++id,who,live,latency,gameroom,playername,opponentname"
});

let main = {
  variables: {
    latencycount: 0,
    latencyarray: []
  }
};

const id = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};

// Let us open a web socket
var ws = new WebSocket("ws://192.168.1.110:8080?id=" + id());

ws.onopen = function() {
  // Web Socket is connected, send data using send()
  console.log("WebSocket Connection Opened");
  //ws.send(JSON.stringify({ type: "channelrequest" }));
};

ws.onmessage = function(e) {
  let data = JSON.parse(e.data);

  switch (data.type) {
    case "message":
      console.log(data.message);
      break;
    case "gamelistupdate":
      postMessage(data);
      break;
    case "gamelistpost":
      postMessage(data);
      break;
  }
};

ws.onclose = function() {
  console.log("Connection is closed...");
};

/*
var socket = io();



socket.emit("gamelistrequest");
socket.on("gamelistresponse", function(data) {
  let msg = {
    msgtype: "echogamelist",
    gamelist: data
  };
  postMessage(msg);
});

socket.on("server2client", function() {
  // In order to create a real-time latency check, we have to first store date/time in an array.
  // This is done via function 'client2server' and stores the date in array main.variables.latencyarray.
  // The server receives the signal from the client, and responds with signal server2client.
  // This function subtracts the date in the latencystart array at the latencycount position and displays it on the screen.
  let mv = main.variables;
  db.gameinfo.update(1, {
    latency: Date.now() - mv.latencyarray[mv.latencycount] + " ms"
  });
  mv.latencycount++;

  // Keep main.variables.latencyarray.length at about 300
  // The function main.methods.latency fires every 1 second
  // So this gives it about 5 minutes worth of latency data
  if (mv.latencyarray.length > 300) {
    mv.latencyarray.splice(0, 1);
    mv.latencycount--;
  }
});

socket.on("gamelistupdate", function(data) {
  let msg = {
    msgtype: "gamelistupdate",
    gamename: data
  };
  postMessage(msg);
});

socket.on("message", function(data) {
  let msg = {
    msgtype: "message",
    content: data
  };
  postMessage(msg);
});

socket.on("gameinitialized", function(data) {
  let msg = {
    msgtype: "disableform"
  };
  postMessage(msg);
});

socket.on("gamelistremoval", function(data) {
  let msg = {
    msgtype: "gamelistremoval",
    gameroom: data
  };
  postMessage(msg);
});

socket.on("joingame_success", function(data) {
  let msg = {
    msgtype: "gamedata"
  };
  console.log(data + " - test");
  data.who == "host"
    ? db.gameinfo
        .update(1, {
          opponentname: data[0].guestname
        })
        .then(() => postMessage(msg))
    : db.gameinfo
        .update(1, {
          who: "guest",
          opponentname: data[0].hostname
        })
        .then(() => postMessage(msg));
});
*/
onmessage = function(e) {
  switch (e.data.msgtype) {
    case "usersetup":
      let channel =
        e.data.gametype == "join" ? e.data.joingame : e.data.newgame;
      let gametype = e.data.gametype == "join" ? "guest" : "host";

      data = {
        type: gametype == "guest" ? "joingame" : "newgame",
        live: "false",
        channel: channel,
        playername: e.data.username,
        who: gametype,
        gamesize: e.data.gamesize,
        goalcount: e.data.goalcount
      };

      db.gameinfo.update(1, {
        who: e.data.gametype == "join" ? "guest" : "host"
      });

      ws.send(JSON.stringify(data));

      break;
    default:
      break;
  }
};
/*
const latency = function() {
  let mv = main.variables;

  var latencytest = setInterval(function() {
    mv.latencyarray.push(new Date()); //Date.now();
    socket.emit("client2server");
  }, 1000);
};

socket.on("newgame_success", function(data) {
  latency();
  let msg = {
    msgtype: "init"
  };

  // short time delay to preven undefined showing up in the latency field
  //setTimeout(() => postMessage(msg), 1000);
  postMessage(msg);

  db.gameinfo.update(1, {
    live: "false",
    gameroom: data.gameroom,
    playername: data.hostname,
    gamesize: data.gamesize,
    goalcount: data.goalcount
  });
});
*/
