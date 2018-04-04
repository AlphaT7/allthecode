const hexGrid = function(canvasName, canvasWidth, canvasHeight, hexSize) {
  this.canvas = document.getElementById(canvasName);
  this.ctx = this.canvas.getContext("2d");

  this.canvas.width =
    canvasWidth <= document.body.offsetWidth
      ? canvasWidth
      : document.body.offsetWidth - 20;
  this.canvas.height = canvasHeight;
  this.canvas.addEventListener("mousemove", e => {
    this.mouseOverEvent(e);
  });
  this.mouse = {
    x: 0,
    y: 0,
    hex: {
      x: 0,
      y: 0
    }
  };
  this.hexSize = hexSize;
  this.hexArr = [];
  this.highlighted = [];

  this.mouseOverEvent = e => {
    this.rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - this.rect.left;
    this.mouse.y = e.clientY - this.rect.top;

    // filter hexArr find the hex that is this.moused over
    let center = this.hexArr.filter(hex => {
      if (
        this.mouse.x <= hex.x + this.hexSize &&
        this.mouse.y <= hex.y + this.hexSize &&
        this.mouse.x >= hex.x - this.hexSize &&
        this.mouse.y >= hex.y - this.hexSize
      ) {
        return hex;
      }
    })[0];
    // as long as center is not undefined, find the coordinate in the grid next to it
    if (center != undefined) {
      this.mouse.hex = center;

      let hex2 = {
        x: center.x + Math.floor(this.hexSize * 1.5),
        y: center.y + Math.floor(this.hexSize * 0.85)
      };

      let hex3 = {
        x: center.x + Math.floor(this.hexSize * 1.5),
        y: center.y - Math.floor(this.hexSize * 0.85)
      };

      //(y = mx + b)

      /*
      let m1 = this.hexSize * 0.85 / this.hexSize * 2.5;
      let b1 = this.hexSize - 17 / 30 * this.hexSize;
      */

      if (this.highlighted.length != 0) {
        this.highlighted.map(element => {
          element.c = "#F4F4F1";
        });
        this.draw(this.highlighted);
      }

      // find the equation of the line (y = mx + b), and then test each coordinate against the equation to see if it solves it.
      // if it does, than it returns those hex coordinates.
      this.highlighted = this.hexArr.filter(hex => {
        let m = (hex2.y - center.y) / (hex2.x - center.x);
        let b = center.y - m * center.x;

        if (hex.y == Math.round(m * hex.x + b)) {
          hex.c = "#75CAEB";
          return hex;
        }
      });

      this.highlighted = this.highlighted.concat(
        this.hexArr.filter(hex => {
          let m = (hex3.y - center.y) / (hex3.x - center.x);
          let b = center.y - m * center.x;

          if (hex.y == Math.round(m * hex.x + b)) {
            hex.c = "#5CB85C";
            return hex;
          }
        })
      );

      this.highlighted = this.highlighted.concat(
        this.hexArr.filter(hex => {
          if (hex.x == center.x) {
            hex.c = "#FF847D";
            return hex;
          }
        })
      );

      this.draw(this.highlighted);
      center.c = "#F0AD4E";
      this.draw([center]);
    }
  };

  this.hexPoint = (center, size, i) => {
    let angle_deg = 60 * i;
    let angle_rad = Math.PI / 180 * angle_deg;

    return {
      x: center.x + size * Math.cos(angle_rad),
      y: center.y + size * Math.sin(angle_rad)
    };
  };

  this.draw = thisArr => {
    thisArr = thisArr == undefined ? this.hexArr : thisArr;
    thisArr.forEach(element => {
      let s1 = this.hexPoint(element, this.hexSize, 1),
        s2 = this.hexPoint(element, this.hexSize, 2),
        s3 = this.hexPoint(element, this.hexSize, 3),
        s4 = this.hexPoint(element, this.hexSize, 4),
        s5 = this.hexPoint(element, this.hexSize, 5),
        s6 = this.hexPoint(element, this.hexSize, 6);

      this.ctx.beginPath();
      this.ctx.moveTo(s1.x, s1.y);
      this.ctx.lineTo(s2.x, s2.y);
      this.ctx.lineTo(s3.x, s3.y);
      this.ctx.lineTo(s4.x, s4.y);
      this.ctx.lineTo(s5.x, s5.y);
      this.ctx.lineTo(s6.x, s6.y);
      this.ctx.lineTo(s1.x, s1.y);
      this.ctx.fillStyle = element.c;
      this.ctx.fill();

      this.ctx.strokeStyle = "#C6CDCA";
      this.ctx.beginPath();
      this.ctx.moveTo(s1.x, s1.y);
      this.ctx.lineTo(s2.x, s2.y);
      this.ctx.lineTo(s3.x, s3.y);
      this.ctx.lineTo(s4.x, s4.y);
      this.ctx.lineTo(s5.x, s5.y);
      this.ctx.lineTo(s6.x, s6.y);
      this.ctx.lineTo(s1.x, s1.y);
      this.ctx.stroke();
    });
  };

  this.setCoordinates = () => {
    //this.hexSize * 0.85 / this.hexSize * 2.5;
    let start = { x: this.hexSize, y: this.hexSize };

    let origin = {
      x: start.x,
      y: start.y
    };

    let widthMuliplier = 10;
    // (this.canvas.width - this.hexSize * 2) / (this.hexSize * 1.5);

    let heightMultiplier = 24;
    for (let j = 0; j < heightMultiplier; j++) {
      for (let i = 0; i < widthMuliplier; i++) {
        this.hexArr.push({ x: start.x, y: start.y, c: "#F4F4F1" });
        start.x += this.hexSize * 3;
      }
      if (j % 2 == 0) {
        start.x = origin.x + this.hexSize * 2 * 0.75;
      } else {
        start.x = origin.x;
      }
      start.y += Math.floor(Math.sqrt(3) / 2 * this.hexSize);
    }
    return this;
  };

  return this;
};

const c = d => {
  console.log(d);
};

const newGrid = new hexGrid("hexgrid", 580, 430, 20).setCoordinates().draw();

/*
width = widthMultiplier * hexSize * 2 * .75 + hexSize * 2

340 = (10 * 20 *2 * .75) + (20 * 2)
340 = (n * hxs * 2 * .75) + (hxs * 2)
*/
