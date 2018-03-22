const $ = q => {
  return document.querySelector(q);
};

const knightImage = new Image();
knightImage.src = "./img/knights.png";
knightImage.onload = function() {
  defaultKnight.render();
};

const sprite = function(options) {
  var that = {};

  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.sx = options.sx;
  that.sy = options.sy;
  that.sw = options.sw;
  that.sh = options.sh;
  that.dx = options.dx;
  that.dy = options.dy;
  that.dw = options.dw;
  that.dh = options.dh;

  that.render = function() {
    that.context.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the animation
    that.context.drawImage(
      that.image,
      that.sx,
      that.sy,
      that.sw,
      that.sh,
      that.dx,
      that.dy,
      that.dw,
      that.dh
    );
  };
  
  return that;
};

var canvas = $("#knightAnimation");
canvas.width = 80;
canvas.height = 120;

var defaultKnight = sprite({
  context: canvas.getContext("2d"),
  image: knightImage,
  sx: 77,
  sy: 0,
  sw: 77,
  sh: 120,
  dx: 0,
  dy: 0,
  dw: 77,
  dh: 120
});

$("body").addEventListener("keyup", function(e) {
  switch (e) {
    case 38:
      console.log("up");
      break;
    case 40:
      console.log("down");
      break;
    case 37:
      console.log("left");
      break;
    case 39:
      console.log("right");
      break;
    default:
      console.log("other");
      break;
  }
});
