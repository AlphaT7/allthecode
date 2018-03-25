const $ = q => {
  return document.querySelector(q);
};

var canvas = $("#hexgrid");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

const hexPoint = (center, size, i) => {
  let angle_deg = 60 * i + 30;
  let angle_rad = Math.PI / 180 * angle_deg;

  return {
    x: center.x + size * Math.cos(angle_rad),
    y: center.y + size * Math.sin(angle_rad)
  };
};

const drawHex = () => {
  let center = { x: 200, y: 200 },
    s1 = hexPoint(center, 20, 1),
    s2 = hexPoint(center, 20, 2),
    s3 = hexPoint(center, 20, 3),
    s4 = hexPoint(center, 20, 4),
    s5 = hexPoint(center, 20, 5),
    s6 = hexPoint(center, 20, 6);

  ctx.beginPath();
  ctx.moveTo(s1.x, s1.y);
  ctx.lineTo(s2.x, s2.y);
  ctx.lineTo(s3.x, s3.y);
  ctx.lineTo(s4.x, s4.y);
  ctx.lineTo(s5.x, s5.y);
  ctx.lineTo(s6.x, s6.y);
  ctx.fill();
};

drawHex();
