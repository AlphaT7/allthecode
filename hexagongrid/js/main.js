const $ = q => {
  return document.querySelector(q);
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
canvas.width = 820;
canvas.height = 600;
canvas.addEventListener("mousemove", e => {
  var rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;

  // filter hexArr find the hex that is moused over
  let center = hexArr.filter(hex => {
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
      newGrid.draw(highlighted);
    }

    // find the equation of the line (y = mx + b), and then test each coordinate against the equation to see if it solves it.
    // if it does, than it returns those hex coordinates.
    highlighted = hexArr.filter(hex => {
      let m = (hex2.y - center.y) / (hex2.x - center.x);
      let b = center.y - m * center.x;

      if (hex.y == Math.round(m * hex.x + b)) {
        hex.c = "#75CAEB";
        return hex;
      }
    });

    highlighted = highlighted.concat(
      hexArr.filter(hex => {
        let m = (hex3.y - center.y) / (hex3.x - center.x);
        let b = center.y - m * center.x;

        if (hex.y == Math.round(m * hex.x + b)) {
          hex.c = "#5CB85C";
          return hex;
        }
      })
    );

    highlighted = highlighted.concat(
      hexArr.filter(hex => {
        if (hex.x == center.x) {
          hex.c = "#FF847D";
          return hex;
        }
      })
    );

    newGrid.draw(highlighted);
    center.c = "#F0AD4E";
    newGrid.draw([center]);
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

  this.draw = thisArr => {
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

  this.setCoordinates = (start, size) => {
    let origin = {
      x: start.x,
      y: start.y
    };

    let sizeMultiplier = 15;
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
};

var newGrid = new drawGrid(hexSize);
newGrid.setCoordinates({ x: hexSize, y: hexSize }, hexSize);
newGrid.draw(hexArr);
