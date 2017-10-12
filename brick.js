

function brick(x, y) {
  if (x)
    this.x = x
  if (y)
    this.y = y

  this.hit
  // this.x = width / 2
  // this.y = height / 2
  this.l = brick_length
  this.h = brick_height

  this.render = function (r, g, b, a) {

    fill(r, g, b, a);
    rect(this.x, this.y, this.l, this.h)// height/yscl);


    if (debugging) {
      push()
      strokeWeight(0.1)
      stroke(100)
      fill(0, 0, 200, 2)
      line(this.x, 0, this.x, height)//left line
      line(this.x + this.l, 0, this.x + this.l, height)//right line
      line(0, this.y, width, this.y)//top line
      line(0, this.y + this.h, width, this.y + this.h) //bottom line
      ellipse(this.x, this.y, 2, 2)
      pop()
    }


  }
}

