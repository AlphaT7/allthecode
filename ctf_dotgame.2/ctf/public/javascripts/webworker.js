importScripts("/socket.io/socket.io.js");
importScripts("dexie.min.js");

var socket = io();

// Create your IndexedDB instance
const db = new Dexie("ctf");

db.version(1).stores({
  //colors: "++id, color, description",
  goals: "++id,who,x,y",
  flags: "++id,who,x,y,src",
  goalboundries: "++id,who,x,y,w,h,c",
  dropboundry: "++id,x,y,w,h,c",
  dots: "++id,who,number,x,y,r,type,live",
  gameinfo:
    "++id,who,live,latency,gameroom,gamesize,goalcount,playername,opponentname"
});

let main = {
  variables: {
    latencycount: 0,
    latencyarray: []
  }
};

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

socket.on("gamedata", function(data) {
  let msg = {
    msgtype: "gamedata"
  };

  db.gameinfo
    .get(1, function(info) {
      info.who == "host"
        ? db.gameinfo.update(1, {
            opponentname: data[0].guestname
          })
        : db.gameinfo.update(1, {
            opponentname: data[0].hostname
          });
    })
    .then(() => postMessage(msg));
});

onmessage = function(e) {
  switch (e.data.msgtype) {
    case "usersetup":
      db.delete().then(() =>
        db.open().then(function() {
          // Here you have a fresh empty database with tables and indexes as defined in version(1),
          // no matter what version the db was on earlier or what data it had.
          let gameroom =
            e.data.gametype == "join" ? e.data.joingame : e.data.newgame;
          let gametype = e.data.gametype == "join" ? "guest" : "host";

          db.gameinfo
            .add({
              live: "false",
              gameroom: gameroom,
              playername: e.data.username,
              who: gametype,
              gamesize: e.data.gamesize,
              goalcount: e.data.goalcount
            })
            .then(init());
        })
      );

      postMessage({ msgtype: "dbcreated" });

      break;
    default:
      break;
  }
};

const latency = function() {
  let mv = main.variables;

  var latencytest = setInterval(function() {
    mv.latencyarray.push(new Date()); //Date.now();
    socket.emit("client2server");
  }, 1000);
};

function init() {
  latency();
  let msg = {
    msgtype: "init"
  };
  setTimeout(() => postMessage(msg), 2000); // short time delay to preven undefined showing up in the latency field

  db.gameinfo.get(1, function(info) {
    info.who == "guest"
      ? socket.emit("joingame", info)
      : socket.emit("newgame", info);
  });
}
