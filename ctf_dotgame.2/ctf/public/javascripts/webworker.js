importScripts("/socket.io/socket.io.js");
importScripts("dexie.min.js");

var socket = io();

socket.emit("message", "I'm a test!");

socket.on("message", function(msg) {
  console.log(msg);
});

// Create your IndexedDB instance

const db = new Dexie("ctf");

db.version(1).stores({
  //colors: "++id, color, description",
  goals: "++id,who,x,y",
  flags: "++id,who,x,y,src",
  goalboundries: "++id,who,x,y,w,h,c",
  dropboundry: "++id,x,y,w,h,c",
  dots: "++id,who,number,x,y,r,type,live",
  gameinfo: "++id,live,latencycount,setupflag,gameroom,playername,host"
});

function recreateDatabase() {
  return db.delete().then(() => db.open());
}

recreateDatabase().then(db => {
  // Here you have a fresh empty database with tables and indexes as defined in version(1),
  // no matter what version the db was on earlier or what data it had.
  db.goals.add({ who: "guest", x: 0, y: 0 });
  db.goals.get(1, function(g) {
    console.log("test - " + g.who);
  });
});
// Define the schema

// Open the database
/*
db.open().catch(function(e) {
  console.error("Open failed: " + e);
});
*/
// Add the data to the database
