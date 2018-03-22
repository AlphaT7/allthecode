const $ = q => {
  return document.querySelector(q);
};

const knightImage = new Image();
knightImage.src = "./img/knights.png";
knightImage.onload = () => {
  downMidPos.render();
};

const gameloop = (dir) => {
    
    switch (dir){
        case 'left':
            downLeftPos.render();
            dir = 'mid';
            break;
        case 'mid':

            break;
    }
    
    if(dir == 'left') {
      downLeftPos.render();
      dir = 'mid';
    }
    window.requestAnimationFrame(gameloop);
};

const sprite = options => {
  let that = {},
    rameIndex = 0,
    tickCount = 0;/*,
    ticksPerFrame = 0,
    numberOfFrames = options.numberOfFrames || 1;*/

  that.update = () => {
    tickCount += 1;

    if (tickCount >= ticksPerFrame) {
      tickCount = 0;

      // Go to the next frame
      frameIndex += 1;
    }
  };

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

  that.render = () => {
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

var flag = false;
var tickCount = 0;
var ticksPerFrame = 10;
var dir;
var prevDir;

var canvas = $("#knightAnimation");
canvas.width = 80;
canvas.height = 120;

var downLeftPos = sprite({
  context: canvas.getContext("2d"),
  image: knightImage,
  sx: 0,
  sy: 0,
  sw: 77,
  sh: 120,
  dx: 0,
  dy: 0,
  dw: 77,
  dh: 120
});

var downMidPos = sprite({
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

var downRightPos = sprite({
  context: canvas.getContext("2d"),
  image: knightImage,
  sx: 154,
  sy: 0,
  sw: 77,
  sh: 120,
  dx: 0,
  dy: 0,
  dw: 77,
  dh: 120
});

$("body").addEventListener("keydown", function(e) {
  switch (e.keyCode) {
    case 38:
      console.log("up");
      break;
    case 40:
      flag = true;
      gameloop('down');
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

$("body").addEventListener("keyup", function(e) {
  switch (e.keyCode) {
    case 38:
      console.log("up");
      break;
    case 40:
      flag = false;
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
