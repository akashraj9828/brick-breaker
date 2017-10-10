function Ball() {
    this.bx = width / 2
    this.by = height - 90
    this.xspeed = speed
    this.yspeed = speed
  
    this.update = function () {
      this.bx += this.xspeed;
      this.by += this.yspeed;
    }
  
    this.wall = function () {
      if (this.bx <= 0 || this.bx >= width)
        this.xspeed = -this.xspeed;
  
      if (this.by <= 0)
        this.yspeed = -this.yspeed
  
      if (this.by >= height) {
        console.log("game over ");
        this.yspeed = -this.yspeed
      }
    }
  
    push();
    this.render = function () {
      noStroke();
      fill("red")
      ellipse(this.bx, this.by,r,r)
      pop();
  
  
  
    }
  }
  