
var pdlspeed
var brc = []
var posx
var posy
var xscl = 50
var yscl = 90
var n = 1000
var speed


function setup() {
  createCanvas(windowWidth, windowHeight)
  pdlspeed = width / 50
  speed = width / 200
  pdl = new paddle();
  ball = new Ball();
  createBrick();
  // frameRate(7)

}
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
    ellipse(this.bx, this.by, height / 50, height / 50)
    pop();



  }
}
function draw() {
  background(51);
  ball.render();
  ball.update()
  ball.wall();
  pdl.show()
  if (keyIsDown(LEFT_ARROW))
    pdl.update(-pdlspeed)
  if (keyIsDown(RIGHT_ARROW))
    pdl.update(pdlspeed);
  for (i = 0; i < brc.length; i++) {
    stroke(10)
    brc[i].render();
  }
  collision();
}

function collision() {
  for (i = 0; i < brc.length; i++) {
    if ((ball.bx < (brc[i].x + (brc[i].l / 2)) && ball.bx > (brc[i].x - (brc[i].l / 2))) && (ball.by > (brc[i].y - (brc[i].h / 2))) && (ball.by < (brc[i].y + (brc[i].h / 2)))) {
      brc.splice(i, 1)
      ball.yspeed = -ball.yspeed
      // ball.xspeed=-ball.xspeed
    }

    if ((ball.by > (brc[i].y - (brc[i].h))) && (ball.by < (brc[i].y + (brc[i].h))) && ((ball.bx==brc[i].x)||(ball.bx==brc[i].x+brc[i].l))){
      ball.xspeed*=-1
      console.log("triiggg")
    }

  }
}

function brick() {
  this.x = width / 2
  this.y = height / 2
  this.l = width / xscl
  this.h = width / xscl / 3
  // var spl
  this.render = function () {
    // rectMode(CENTER);
    fill(120);
    rect(this.x, this.y, this.l, this.h)// height/yscl);
  }
}

function createBrick() {
  posx = 200
  posy = 200
  for (i = 0; i < n; i++) {
    brc[i] = new brick();
    brc[i].x = posx
    brc[i].y = posy
    posx += width / (xscl - 1)
    if (posx > width - 200) {
      posy += height / (yscl - 1)
      posx = 200
    }
  }

}






function paddle() {
  this.y = height - 30
  this.x = width / 2
  this.show = function () {
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, width / 7, height / 50);

  }
  this.update = function (key) {

    this.x += key;

  }
}
