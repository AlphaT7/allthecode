const $ = q => {
  return document.querySelector(q);
};

var canvas = document.getElementById("scene");
canvas.width = 700;
canvas.height = 700;
var ctx = canvas.getContext("2d");
var particles = [];

canvas.addEventListener("click", function(e) {
  let mx = getMousePos(canvas, e).x - 15;
  let my = getMousePos(canvas, e).y - 15;
  console.log(mx + ":" + my);
  drawScene(mx, my);
});

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(evt.clientX - rect.left),
    y: Math.round(evt.clientY - rect.top)
  };
}

function drawScene(mx, my) {
  ctx.drawImage(png, 0 + mx, 0 + my);

  var data = ctx.getImageData(0, 0, png.width + mx, png.height + my);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "blue";

  for (var y = 0 + my, y2 = data.height; y < y2; y++) {
    for (var x = 0 + mx, x2 = data.width; x < x2; x++) {
      //if (data.data[y * 4 * data.width + x * 4 + 3] > 128) {
      if (data.data[y * 4 * data.width + x * 4 + 3] > 0) {
        var particle = {
          x0: x,
          y0: y,
          x1: png.width / 2 + mx,
          y1: png.height / 2 + my,
          //x1: png.width / 2,
          //y1: png.height / 2,

          speed: Math.random() * 4 + 2
        };
        TweenMax.to(particle, particle.speed, {
          x1: particle.x0,
          y1: particle.y0,
          delay: 0, //y / 30,
          ease: Elastic.easeOut
        });
        particles.push(particle);
      }
    }
  }

  requestAnimationFrame(render);
}
var render = function() {
  requestAnimationFrame(render);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0, j = particles.length; i < j; i++) {
    var particle = particles[i];
    ctx.fillRect(particle.x1 * 1, particle.y1 * 1, 1, 1);
  }
};

var png = new Image();
//png.onload = drawScene;
png.onload = function() {
  console.log("loaded");
};
//png.src = "./img/white-circle2.png";
png.src = "./img/ww_logo-circle.png";
