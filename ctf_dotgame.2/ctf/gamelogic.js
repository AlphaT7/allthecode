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
  });
};
