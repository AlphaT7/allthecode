exports = module.exports = function(io) {
  io.sockets.on("connection", function(socket) {
    socket.on("message", function(msg) {
      socket.emit("message", msg);
      console.log("message event triggered");
    });

    // MEASURE NETWORK LATENCY BETWEEN THE CLIENT AND THE SERVER
    socket.on("client2server", function() {
      socket.emit("server2client");
    });

    socket.on("newgame", function(data) {
      if (games.hasOwnProperty(data.gamename)) {
        socket.emit("message", "This name is already in use.");
      } else {
        methods.gameroomcleanup(data, socket);
        io.emit("removegame", data.oldgamename);
        socket.join(data.gamename, function() {
          games[data.gamename] = {
            stepinterval: 0,
            stepcounter: 0,
            gamestate: [],
            goals: data.goals,
            flags1: data.flags,
            flags2: "",
            goalboundries: data.goalboundries,
            dropboundry: data.dropboundry,
            gamelive: false,
            dots1: {
              d1: {
                x: "",
                y: "",
                r: "",
                n: 1,
                dottype: "",
                live: false
              },
              d2: {
                x: "",
                y: "",
                r: "",
                n: 2,
                dottype: "",
                live: false
              },
              d3: {
                x: "",
                y: "",
                r: "",
                n: 3,
                dottype: "",
                live: false
              },
              d4: {
                x: "",
                y: "",
                r: "",
                n: 4,
                dottype: "",
                live: false
              },
              d5: {
                x: "",
                y: "",
                r: "",
                n: 5,
                dottype: "",
                live: false
              },
              d6: {
                x: "",
                y: "",
                r: "",
                n: 6,
                dottype: "",
                live: false
              },
              d7: {
                x: "",
                y: "",
                r: "",
                n: 7,
                dottype: "",
                live: false
              },
              d8: {
                x: "",
                y: "",
                r: "",
                n: 8,
                dottype: "",
                live: false
              },
              d9: {
                x: "",
                y: "",
                r: "",
                n: 9,
                dottype: "",
                live: false
              },
              d10: {
                x: "",
                y: "",
                r: "",
                n: 10,
                dottype: "",
                live: false
              }
            },
            dots2: {
              d1: {
                x: "",
                y: "",
                r: "",
                n: 1,
                dottype: "",
                live: false
              },
              d2: {
                x: "",
                y: "",
                r: "",
                n: 2,
                dottype: "",
                live: false
              },
              d3: {
                x: "",
                y: "",
                r: "",
                n: 3,
                dottype: "",
                live: false
              },
              d4: {
                x: "",
                y: "",
                r: "",
                n: 4,
                dottype: "",
                live: false
              },
              d5: {
                x: "",
                y: "",
                r: "",
                n: 5,
                dottype: "",
                live: false
              },
              d6: {
                x: "",
                y: "",
                r: "",
                n: 6,
                dottype: "",
                live: false
              },
              d7: {
                x: "",
                y: "",
                r: "",
                n: 7,
                dottype: "",
                live: false
              },
              d8: {
                x: "",
                y: "",
                r: "",
                n: 8,
                dottype: "",
                live: false
              },
              d9: {
                x: "",
                y: "",
                r: "",
                n: 9,
                dottype: "",
                live: false
              },
              d10: {
                x: "",
                y: "",
                r: "",
                n: 10,
                dottype: "",
                live: false
              }
            },
            [socket.id]: {
              playername: data.username,
              host: true
            },
            playercount: 1,
            gamesize: {
              x: data.gamesize.split(".")[0],
              y: data.gamesize.split(".")[1]
            }
          };
          socket.emit("joingame", data.gamename);
          socket.broadcast.emit("addgame", data.gamename);
        });
      }
    });
  });
};
