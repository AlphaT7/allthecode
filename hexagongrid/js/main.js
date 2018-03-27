const $ = q => {
  return document.querySelector(q);
};

Array.prototype.clone = function() {
  return this.slice(0);
};

const c = d => {
  console.log(d);
};

var canvas = $("#hexgrid");
var ctx = canvas.getContext("2d");
var hexSize = 20;
var mouse = {
  x: 0,
  y: 0,
  hex: {
    x: 0,
    y: 0
  }
};
var hexArr = [];
var highlighted = [];
var flag = true;
//var prevHighlighted = {};
canvas.width = 1000;
canvas.height = 600;
canvas.addEventListener("mousemove", e => {
  var rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;

  let newHexArr = hexArr.clone();
  let center = newHexArr.filter(hex => {
    if (
      mouse.x <= hex.x + hexSize &&
      mouse.y <= hex.y + hexSize &&
      mouse.x >= hex.x - hexSize &&
      mouse.y >= hex.y - hexSize
    ) {
      return hex;
    }
  })[0];
  c(center)
  if (center != undefined) {
    let update = new drawGrid(hexSize);
    update.highlight(center);
  }
});

const drawGrid = function(size) {
  this.hexPoint = (center, size, i) => {
    let angle_deg = 60 * i;
    let angle_rad = Math.PI / 180 * angle_deg;

    return {
      x: center.x + size * Math.cos(angle_rad),
      y: center.y + size * Math.sin(angle_rad)
    };
  };

  this.highlight = center => {
    let s1 = this.hexPoint(center, size, 1),
      s2 = this.hexPoint(center, size, 2),
      s3 = this.hexPoint(center, size, 3),
      s4 = this.hexPoint(center, size, 4),
      s5 = this.hexPoint(center, size, 5),
      s6 = this.hexPoint(center, size, 6);

    ctx.beginPath();
    ctx.moveTo(s1.x, s1.y);
    ctx.lineTo(s2.x, s2.y);
    ctx.lineTo(s3.x, s3.y);
    ctx.lineTo(s4.x, s4.y);
    ctx.lineTo(s5.x, s5.y);
    ctx.lineTo(s6.x, s6.y);
    ctx.lineTo(s1.x, s1.y);
    ctx.fillStyle = "green";
    ctx.fill();
  };

  this.updateHex = size => {
    //let center = { x: 200, y: 200 },
    if (flag) {
      hexArr.push(center);
    }
    let s1 = this.hexPoint(center, size, 1),
      s2 = this.hexPoint(center, size, 2),
      s3 = this.hexPoint(center, size, 3),
      s4 = this.hexPoint(center, size, 4),
      s5 = this.hexPoint(center, size, 5),
      s6 = this.hexPoint(center, size, 6);

    ctx.beginPath();
    ctx.moveTo(s1.x, s1.y);
    ctx.lineTo(s2.x, s2.y);
    ctx.lineTo(s3.x, s3.y);
    ctx.lineTo(s4.x, s4.y);
    ctx.lineTo(s5.x, s5.y);
    ctx.lineTo(s6.x, s6.y);
    ctx.lineTo(s1.x, s1.y);
    ctx.fillStyle = ctx.isPointInPath(mouse.x, mouse.y) ? "green" : "black";
    if (ctx.isPointInPath(mouse.x, mouse.y)) {
      mouse.hex.x = center.x;
      mouse.hex.y = center.y;
    } else {
      let yPlus = Math.floor(Math.sqrt(3) / 2 * size) * 2;
      let xPlus = size * 2;
      if (
        (mouse.hex.x == center.x && (mouse.hex.y - size) % yPlus == 0) ||
        (mouse.hex.x == center.x &&
          (mouse.hex.y - (size + yPlus / 2)) % yPlus == 0)
      ) {
        ctx.fillStyle = "pink";
      } else if ("0" == 0) {
      }
    }
    //ctx.isPointInPath(mouse.x, mouse.y) ? drawLines(center) : null;
    ctx.fill();

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(s1.x, s1.y);
    ctx.lineTo(s2.x, s2.y);
    ctx.lineTo(s3.x, s3.y);
    ctx.lineTo(s4.x, s4.y);
    ctx.lineTo(s5.x, s5.y);
    ctx.lineTo(s6.x, s6.y);
    ctx.lineTo(s1.x, s1.y);
    ctx.stroke();
  };

  this.drawHex = (center, size) => {
    //let center = { x: 200, y: 200 },
    if (flag) {
      hexArr.push(center);
    }
    let s1 = this.hexPoint(center, size, 1),
      s2 = this.hexPoint(center, size, 2),
      s3 = this.hexPoint(center, size, 3),
      s4 = this.hexPoint(center, size, 4),
      s5 = this.hexPoint(center, size, 5),
      s6 = this.hexPoint(center, size, 6);

    ctx.beginPath();
    ctx.moveTo(s1.x, s1.y);
    ctx.lineTo(s2.x, s2.y);
    ctx.lineTo(s3.x, s3.y);
    ctx.lineTo(s4.x, s4.y);
    ctx.lineTo(s5.x, s5.y);
    ctx.lineTo(s6.x, s6.y);
    ctx.lineTo(s1.x, s1.y);
    ctx.fill();

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(s1.x, s1.y);
    ctx.lineTo(s2.x, s2.y);
    ctx.lineTo(s3.x, s3.y);
    ctx.lineTo(s4.x, s4.y);
    ctx.lineTo(s5.x, s5.y);
    ctx.lineTo(s6.x, s6.y);
    ctx.lineTo(s1.x, s1.y);
    ctx.stroke();
  };

  this.setCoordinates = (start, size) => {
    let origin = {
      x: start.x,
      y: start.y
    };

    let sizeMultiplier = 18;
    for (let j = 0; j < 34; j++) {
      for (let i = start.x; i < size * sizeMultiplier; i += size) {
        hexArr.push({ x: start.x, y: start.y, c: "black" });
        //drawHex(start, size);
        start.x += size * 3;
      }
      if (j % 2 == 0) {
        start.x = origin.x + size * 2 * 0.75;
      } else {
        start.x = origin.x; // + size * 3;
      }
      start.y += Math.floor(Math.sqrt(3) / 2 * size);
    }
    flag = false;
  };

  this.draw = function(size) {
    hexArr.forEach(value => {
      this.drawHex(value, size);
    });
  };

  //  this.setCoordinates({ x: size, y: size }, size);
};

const loop = () => {
  newGrid.updateHex(hexSize);
  window.requestAnimationFrame(loop);
};

var newGrid = new drawGrid(hexSize);
newGrid.setCoordinates({ x: hexSize, y: hexSize }, hexSize);
newGrid.draw(hexSize);
//loop();
