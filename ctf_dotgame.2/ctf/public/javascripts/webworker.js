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
  gameinfo: "++id,who,live,latency,gameroom,playername"
});

//function recreateDatabase() {
//return db
//db.delete().then(() => db.open().then(postMessage({ msgtype: "dbcreated" })));
//}
/*
recreateDatabase().then(db => {
  // Here you have a fresh empty database with tables and indexes as defined in version(1),
  // no matter what version the db was on earlier or what data it had.
  db.goals.add({ who: "guest", x: 0, y: 0 });
  db.goals.get(1, function(g) {
    console.log("test - " + g.who);
  });
});
*/

let main = {
  variables: {
    latencycount: 0,
    latencyarray: [],
    gamelive: false
  }
};

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

onmessage = function(e) {
  switch (e.data.msgtype) {
    case "usersetup":
      db.delete().then(() =>
        db.open().then(function() {
          // Here you have a fresh empty database with tables and indexes as defined in version(1),
          // no matter what version the db was on earlier or what data it had.
          let who = e.data.newgame == "" ? "guest" : "host";
          let gameroom =
            e.data.newgame == "" ? e.data.joingame : e.data.newgame;

          db.gameinfo
            .add({
              live: "false",
              gameroom: gameroom,
              playername: e.data.username,
              who: who
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
}
