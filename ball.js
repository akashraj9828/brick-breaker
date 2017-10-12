function Ball() {


  this.xspeed = speed
  this.yspeed = speed
  this.x = width / 2
  this.y = height - height / 10

  this.update = function () {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  this.wall = function () {
    if (this.x <= 0 || this.x >= width)
      this.xspeed = -this.xspeed;

    if (this.y <= 0)
      this.yspeed = -this.yspeed

    if (this.y >= height) {
      console.log("game over ");
      this.yspeed = -this.yspeed
    }
  }

  push();
  this.render = function () {
    noStroke();
    fill("red")
    ellipse(this.x, this.y, r, r)
    pop();



  }
}
