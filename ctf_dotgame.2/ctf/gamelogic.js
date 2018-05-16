// https://gist.github.com/crtr0/2896891 --> Socket.IO Rooms Example
// io.emit --> broadcast to everyone
// socket.emit --> broadcast to just the sender

/*
// sending to sender-client only
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only');
*/

"strict";

exports = module.exports = function(io, mdb) {
  io.sockets.on("connection", function(socket) {
    socket.on("message", function(msg) {
      socket.emit("message", msg);
      console.log("message event triggered");
    });

    // MEASURE NETWORK LATENCY BETWEEN THE CLIENT AND THE SERVER
    socket.on("client2server", function() {
      socket.emit("server2client");
    });

    socket.on("gamelistrequest", function(data) {
      mdb.connect("mongodb://localhost:27017/", function(err, db) {
        if (err) throw err;
        console.log("Connected to Mongo Database");

        var dbo = db.db("ctf");
        var gamelist = dbo
          .collection("gamelist")
          .find({ playercount: "1" })
          .project({ gameroom: 1, _id: false })
          .toArray(function(err, result) {
            if (err) throw err;
            socket.emit("gamelistresponse", result);
            db.close();
            console.log("Closed Connection");
          });
      });
    });

    socket.on("newgame", function(data) {
      mdb.connect("mongodb://localhost:27017/", function(err, db) {
        if (err) throw err;
        console.log("Connected to Mongo Database");

        var dbo = db.db("ctf");

        dbo
          .collection("gamelist")
          .findOne({ gameroom: data.gameroom }, function(err, result) {
            if (err) throw err;
            if (result) {
              socket.emit(
                "message",
                "The name '" +
                  result.gameroom +
                  "' is already in use.  Please pick a different name for your game channel."
              );
            } else {
              dbo
                .collection("gamelist")
                .insert({
                  gameroom: data.gameroom,
                  host: socket.id,
                  hostname: data.playername,
                  playercount: "1"
                })
                .then(function() {
                  socket.join(data.gameroom);
                  socket.broadcast.emit("gamelistupdate", data.gameroom);
                  socket.emit(
                    "message",
                    "Game channel '" + data.gameroom + "' has been created."
                  );
                  db.close();
                  console.log("Closed Connection");
                });
            }
          });
      });
    });

    socket.on("joingame", function(data) {
      mdb.connect("mongodb://localhost:27017/", function(err, db) {
        if (err) throw err;
        console.log("Connected to Mongo Database");

        var dbo = db.db("ctf");

        dbo
          .collection("gamelist")
          .findOne(
            { gameroom: data.gameroom, hostname: data.playername },
            function(err, result) {
              if (err) throw err;
              if (result) {
                socket.emit(
                  "message",
                  "User name '" +
                    data.playername +
                    "' is already in use. Please pick a different user name."
                );
              } else {
                dbo.collection("gamelist").updateOne(
                  { gameroom: data.gameroom },
                  {
                    $set: {
                      guest: socket.id,
                      guestname: data.playername,
                      playercount: 2
                    }
                  },
                  function(err, result) {
                    if (err) throw err;

                    socket.join(data.gameroom);
                    socket.emit(
                      "message",
                      "Game channel '" + data.gameroom + "' has been joined."
                    );
                    io.in(data.gameroom).emit("gameinitialized");
                    io.emit("gamelistremoval", data.gameroom);

                    dbo
                      .collection("gamelist")
                      .find({ gameroom: data.gameroom })
                      .project({
                        hostname: 1,
                        guestname: 1,
                        gameroom: 1,
                        _id: false
                      })
                      .toArray(function(err, result) {
                        if (err) throw err;
                        io.to(data.gameroom).emit("gamedata", result);
                        db.close();
                        console.log("Closed Connection");
                      });
                  }
                );
              }
            }
          );
      });
    });
  });
};
