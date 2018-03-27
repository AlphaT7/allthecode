const $ = q => {
  return document.querySelector(q);
};

const c = d => {
  console.log(d);
};

var canvas = $("#hexgrid");
var ctx = canvas.getContext("2d");
var hexSize = 20;
canvas.width = 1000;
canvas.height = 600;

const hexPoint = (center, size, i) => {
  let angle_deg = 60 * i;
  let angle_rad = Math.PI / 180 * angle_deg;

  return {
    x: center.x + size * Math.cos(angle_rad),
    y: center.y + size * Math.sin(angle_rad)
  };
};

const drawHex = (center, size) => {
  //let center = { x: 200, y: 200 },
  let s1 = hexPoint(center, size, 1),
    s2 = hexPoint(center, size, 2),
    s3 = hexPoint(center, size, 3),
    s4 = hexPoint(center, size, 4),
    s5 = hexPoint(center, size, 5),
    s6 = hexPoint(center, size, 6);

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

const drawGrid = size => {
  //let maxHexNumber = Math.floor(canvas.width / (size * 2) * 0.75);

  const drawTop = (start, size) => {};

  const drawMid = (start, size) => {
    let origin = {
      x: start.x,
      y: start.y
    };

    let sizeMultiplier = 18;
    for (let j = 0; j < 10; j++) {
      for (let i = start.x; i < size * sizeMultiplier; i += size) {
        drawHex(start, size);
        start.x += size * 3;
      }
      if (j % 2 == 0) {
        start.x = origin.x + size * 2 * 0.75;
      } else {
        start.x = origin.x; // + size * 3;
      }
      start.y += Math.floor(Math.sqrt(3) / 2 * size);
    }
  };

  const drawBottom = (start, size) => {
    let origin = {
      x: start.x,
      y: start.y
    };
    let sizeMultiplier = 18;
    for (let j = 1; j < 12; j++) {
      for (let i = start.x; i < size * sizeMultiplier; i += size) {
        drawHex(start, size);
        start.x += size * 3;
      }
      if (j % 2 == 0) {
        start.x = origin.x + size * 3 * j * 0.5;
        sizeMultiplier += 1;
      } else {
        start.x = origin.x + size * 2 * 0.75 * j;
      }
      start.y = origin.y + Math.floor(Math.sqrt(3) / 2 * size * j);
    }
  };

  drawTop({ x: size * 12 * 3 * 0.5, y: size }, size);
  drawBottom({ x: size, y: canvas.height * 2 / 3 }, size);
  drawMid({ x: size, y: canvas.height * 1 / 3 }, size);
};

drawGrid(hexSize);
