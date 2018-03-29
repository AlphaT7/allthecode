const $ = q => {
  return document.querySelector(q);
};

Array.prototype.clone = function() {
  return this.slice(0);
};

const c = d => {
  console.log(d);
};

const heightDifference = size => {
  return Math.floor(Math.sqrt(3) / 2 * size) * 2;
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

  // clone hexArr and find the hex that is moused over
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
  // as long as center is not undefined, find the coordinate in the grid next to it
  if (center != undefined) {
    mouse.hex = center;

    let hex2 = {
      x: center.x + Math.floor(hexSize * 1.5),
      y: center.y + Math.floor(hexSize * 0.85)
    };

    let hex3 = {
      x: center.x + Math.floor(hexSize * 1.5),
      y: center.y - Math.floor(hexSize * 0.85)
    };

    //(y = mx + b)

    /*
    let m1 = hexSize * 0.85 / hexSize * 2.5;
    let b1 = hexSize - 17 / 30 * hexSize;
    */

    if (highlighted.length != 0) {
      highlighted.map(element => {
        element.c = "#F4F4F1";
      });
      newGrid.highlight(highlighted);
    }

    // find the equation of the line (y = mx + b), and then test each coordinate against the equation to see if it solves it.
    // if it does, than it returns those hex coordinates.
    highlighted = newHexArr.filter(hex => {
      let m = (hex2.y - center.y) / (hex2.x - center.x);
      let b = center.y - m * center.x;

      if (hex.y == Math.round(m * hex.x + b)) {
        hex.c = "blue";
        return hex;
      }
    });

    highlighted = highlighted.concat(
      newHexArr.filter(hex => {
        let m = (hex3.y - center.y) / (hex3.x - center.x);
        let b = center.y - m * center.x;

        if (hex.y == Math.round(m * hex.x + b)) {
          hex.c = "green";
          return hex;
        }
      })
    );

    highlighted = highlighted.concat(
      newHexArr.filter(hex => {
        if (hex.x == center.x) {
          hex.c = "red";
          return hex;
        }
      })
    );

    newGrid.highlight(highlighted);
    center.c = "orange";
    newGrid.highlight([center]);
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

  this.highlight = (thisArr, color) => {
    thisArr.forEach(element => {
      let s1 = this.hexPoint(element, size, 1),
        s2 = this.hexPoint(element, size, 2),
        s3 = this.hexPoint(element, size, 3),
        s4 = this.hexPoint(element, size, 4),
        s5 = this.hexPoint(element, size, 5),
        s6 = this.hexPoint(element, size, 6);

      ctx.beginPath();
      ctx.moveTo(s1.x, s1.y);
      ctx.lineTo(s2.x, s2.y);
      ctx.lineTo(s3.x, s3.y);
      ctx.lineTo(s4.x, s4.y);
      ctx.lineTo(s5.x, s5.y);
      ctx.lineTo(s6.x, s6.y);
      ctx.lineTo(s1.x, s1.y);
      ctx.fillStyle = element.c;
      ctx.fill();

      ctx.strokeStyle = "#C6CDCA";
      ctx.beginPath();
      ctx.moveTo(s1.x, s1.y);
      ctx.lineTo(s2.x, s2.y);
      ctx.lineTo(s3.x, s3.y);
      ctx.lineTo(s4.x, s4.y);
      ctx.lineTo(s5.x, s5.y);
      ctx.lineTo(s6.x, s6.y);
      ctx.lineTo(s1.x, s1.y);
      ctx.stroke();
    });
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
    ctx.fillStyle = center.c;
    ctx.fill();

    ctx.strokeStyle = "#C6CDCA";
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
        hexArr.push({ x: start.x, y: start.y, c: "#F4F4F1" });
        start.x += size * 3;
      }
      if (j % 2 == 0) {
        start.x = origin.x + size * 2 * 0.75;
      } else {
        start.x = origin.x;
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
};

var newGrid = new drawGrid(hexSize);
newGrid.setCoordinates({ x: hexSize, y: hexSize }, hexSize);
newGrid.draw(hexSize);
