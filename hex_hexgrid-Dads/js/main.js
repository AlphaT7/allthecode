function drawHex(gridRadius, hexRadius) {
  this.canvas = document.getElementById("hexgrid");
  this.ctx = this.canvas.getContext("2d");
  this.canvas.height =
    Math.sqrt(Math.pow(hexRadius, 2) - Math.pow(hexRadius / 2, 2)) *
      2 *
      (gridRadius + 1) +
    3;
  this.canvas.width = this.canvas.height;
  this.centerpoint = (this.canvas.height + 1) / 2 - 1;

  this.hexPoint = (center, size, i) => {
    let angle_deg = 60 * i;
    let angle_rad = (Math.PI / 180) * angle_deg;

    return {
      x: center.x + size * Math.cos(angle_rad),
      y: center.y + size * Math.sin(angle_rad)
    };
  };

  this.draw = thisArr => {
    thisArr.forEach(element => {
      let s1 = this.hexPoint(element, hexRadius, 1),
        s2 = this.hexPoint(element, hexRadius, 2),
        s3 = this.hexPoint(element, hexRadius, 3),
        s4 = this.hexPoint(element, hexRadius, 4),
        s5 = this.hexPoint(element, hexRadius, 5),
        s6 = this.hexPoint(element, hexRadius, 6);

      this.ctx.beginPath();
      this.ctx.moveTo(s1.x, s1.y);
      this.ctx.lineTo(s2.x, s2.y);
      this.ctx.lineTo(s3.x, s3.y);
      this.ctx.lineTo(s4.x, s4.y);
      this.ctx.lineTo(s5.x, s5.y);
      this.ctx.lineTo(s6.x, s6.y);
      this.ctx.lineTo(s1.x, s1.y);
      this.ctx.fillStyle = "#F5F5F5";
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

  this.draw([
    { x: this.centerpoint, y: this.centerpoint },
    {
      x: this.centerpoint,
      y: this.centerpoint - Math.round(hexRadius * Math.sqrt(3))
    },
    {
      x: this.centerpoint,
      y: this.centerpoint + Math.round(hexRadius * Math.sqrt(3))
    },
    {
      x: this.centerpoint + hexRadius * 1.5,
      y: this.centerpoint + Math.round((hexRadius * Math.sqrt(3)) / 2)
    },
    {
      x: this.centerpoint + hexRadius * 1.5,
      y: this.centerpoint - Math.round((hexRadius * Math.sqrt(3)) / 2)
    },
    {
      x: this.centerpoint - hexRadius * 1.5,
      y: this.centerpoint - Math.round((hexRadius * Math.sqrt(3)) / 2)
    },
    {
      x: this.centerpoint - hexRadius * 1.5,
      y: this.centerpoint + Math.round((hexRadius * Math.sqrt(3)) / 2)
    }
  ]);
}

drawHex(3.5, 50);
