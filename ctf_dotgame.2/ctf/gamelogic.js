"strict";

exports = module.exports = function(WebSocket, mdb, url) {
  const wss = new WebSocket.Server({ port: 8080 });

  const channels = [];

  wss.on("connection", function connection(ws, req) {
    const parameters = url.parse(req.url, true);
    ws.id = parameters.query.id;
    setTimeout(() => {
      //ws.terminate();
    }, 3000);
    console.log(ws.id + " - id connected");

    const broadcast = data => {
      //broadcast to everyone including the sender
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(data));
      });
    };

    const broadcast1 = data => {
      //broadcast to everyone except the sender
      wss.clients.forEach(function each(client) {
        if (client.id != ws.id) {
          client.send(JSON.stringify(data));
        }
      });
    };

    const broadcast2 = data => {
      //broadcast to everyone in game channel
      wss.clients.forEach(function each(client) {
        if (client.channel == data.channel) {
          client.send(JSON.stringify(data));
        }
      });
    };

    const broadcast3 = data => {
      //broadcast to everyone in game channel except sender
      wss.clients.forEach(function each(client) {
        if (client.channel == data.channel && client.id != ws.id) {
          client.send(JSON.stringify(data));
        }
      });
    };

    mdb.connect("mongodb://localhost:27017/", function(err, db) {
      if (err) throw err;
      var dbo = db.db("ctf");
      var gamelist = dbo
        .collection("gamelist")
        .find({ playercount: "1" })
        .project({ channel: 1, _id: false })
        .toArray(function(err, result) {
          if (err) throw err;
          if (result) {
            let data = { type: "gamelistpost", list: result };
            ws.send(JSON.stringify(data));
          }
          db.close();
        });
    });

    let data = "";

    ws.on("message", function incoming(message) {
      switch (JSON.parse(message).type) {
        case "message":
          console.log("received:" + JSON.parse(message).msg);
          break;

        case "client2server":
          ws.send(JSON.stringify({ type: "server2client" }));
          break;

        case "newgame":
          data = JSON.parse(message);
          mdb.connect("mongodb://localhost:27017/", function(err, db) {
            if (err) throw err;

            var dbo = db.db("ctf");

            dbo
              .collection("gamelist")
              .findOne({ channel: data.channel }, function(err, result) {
                if (err) throw err;
                if (result) {
                  ws.send(
                    JSON.stringify({
                      type: "message",
                      message:
                        "The name '" +
                        result.channel +
                        "' is already in use.  Please pick a different name for your game channel."
                    })
                  );
                } else {
                  dbo
                    .collection("gamelist")
                    .insert({
                      channel: data.channel,
                      host: ws.id,
                      hostname: data.playername,
                      playercount: "1",
                      gamesize: data.gamesize,
                      goalcount: data.goalcount
                    })
                    .then(() => {
                      ws.channel = data.channel;
                    })
                    .then(() => {
                      ws.send(
                        JSON.stringify({
                          type: "message",
                          message:
                            "Game Channel '" +
                            data.channel +
                            "' Has Been Created!"
                        })
                      );
                      broadcast({
                        type: "gamelistupdate",
                        channel: data.channel
                      });
                      db.close();
                    });
                }
              });
          });
          break;
        case "joingame":
          data = JSON.parse(message);
          mdb.connect("mongodb://localhost:27017/", function(err, db) {
            if (err) throw err;

            var dbo = db.db("ctf");

            dbo
              .collection("gamelist")
              .findOne(
                { channel: data.channel, hostname: data.playername },
                function(err, result) {
                  if (err) throw err;
                  if (result) {
                    ws.send(
                      JSON.stringify({
                        type: "message",
                        message:
                          "User name '" +
                          result.hostname +
                          "' is already in use. Please pick a different user name."
                      })
                    );
                  } else {
                    dbo
                      .collection("gamelist")
                      .updateOne(
                        {
                          channel: data.channel
                        },
                        {
                          $set: {
                            guest: ws.id,
                            guestname: data.playername,
                            playercount: "2"
                          }
                        }
                      )
                      .then(function() {
                        ws.channel = data.channel;
                        broadcast({
                          type: "gamelistremoval",
                          channel: data.channel
                        });
                        ws.send(
                          JSON.stringify({
                            type: "message",
                            message:
                              "Game Channel '" +
                              data.channel +
                              "' Joined Successfully!"
                          })
                        );
                      })
                      .then(function() {
                        dbo
                          .collection("gamelist")
                          .find({ channel: data.channel })
                          .project({
                            channel: 1,
                            hostname: 1,
                            guestname: 1,
                            _id: false
                          })
                          .toArray(function(err, result) {
                            if (err) throw err;
                            result[0].type = "gamedata";
                            console.log(result[0]);
                            broadcast2(result[0]);
                            db.close();
                          });
                      });
                  }
                }
              );
          });
          break;
        case "close":
          console.log(ws.id + " - socket closed");
          break;
        default:
          break;
      }
    });
  });
  /*
  io.sockets.on("connection", function(socket) {
    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });

    socket.on("message", function(msg) {
      socket.emit("message", msg);
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
                  playercount: "1",
                  gamesize: data.gamesize,
                  goalcount: data.goalcount
                })
                .then(function() {
                  socket.join(data.gameroom);
                  socket.broadcast.emit("gamelistupdate", data.gameroom);
                  socket.emit(
                    "message",
                    "Game channel '" + data.gameroom + "' has been created."
                  );
                  socket.emit("newgame_success", {
                    gameroom: data.gameroom,
                    hostname: data.playername,
                    gamesize: data.gamesize,
                    goalcount: data.goalcount
                  });
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
                let cb = () => {
                  console.log(Object.keys(io.sockets.connected));
                  dbo
                    .collection("gamelist")
                    .find({ gameroom: data.gameroom })
                    .project({
                      host: 1,
                      guest: 1,
                      hostname: 1,
                      guestname: 1,
                      gameroom: 1,
                      _id: false
                    })
                    .toArray(function(err, result) {
                      if (err) throw err;
                      console.log(result);
                      Object.keys(io.sockets.connected).forEach(
                        (element, index, array) => {
                          socket.to(element).emit("joingame_success", result);
                        }
                      );
                      db.close();
                      console.log("Closed Connection");
                    });
                };

                (cb => {
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
                      io.emit("gamelistremoval", data.gameroom);
                    }
                  );
                  cb();
                })(cb);
              }
            }
          );
      });
    });
  });
*/
};
