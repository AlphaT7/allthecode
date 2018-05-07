importScripts("socket.io.js");

//var socket = io("http://38.98.xxx.xxx:6000");
var socket = io();

var connections = 0;

onmessage = function(e) {
  postMessage(e.data);
};

self.addEventListener(
  "connect",
  function(e) {
    var port = e.ports[0];
    connections++;
    port.addEventListener(
      "message",
      function(e) {
        if (e.data === "start") {
          port.postMessage("hello");
        }
      },
      false
    );
    port.start();

    socket.on("push", function(pushed) {
      port.postMessage(pushed);
    });

    socket.on("connect", function() {
      port.postMessage("connect");
    });

    socket.on("disconnect", function() {
      port.postMessage("disconnect");
    });
  },
  false
);
