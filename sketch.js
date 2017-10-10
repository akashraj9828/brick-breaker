
var pdlspeed
var brc = []
var posx
var posy
var xscl = 50
var yscl = 90
var n = 1000
var speed
var r

var pause=false


function setup() {
  createCanvas(windowWidth, windowHeight)
  r=height/50
  pdlspeed = width / 50
  speed = width / 200
  pdl = new paddle();
  ball = new Ball();
  createBrick();
  // frameRate(7)

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
    if ((ball.bx +r/2< (brc[i].x + (brc[i].l / 2)) && ball.bx +r/2> (brc[i].x - (brc[i].l / 2))) && (ball.by+r/2 > (brc[i].y - (brc[i].h / 2))) && (ball.by +r/2< (brc[i].y + (brc[i].h / 2)))) {
      brc.splice(i, 1)
      ball.yspeed = -ball.yspeed
      // ball.xspeed=-ball.xspeed
    }

    if ((ball.by+r/2 > (brc[i].y - (brc[i].h))) && (ball.by +r/2< (brc[i].y + (brc[i].h))) && ((ball.bx+r/2==brc[i].x)||(ball.bx+r/2==brc[i].x+brc[i].l))){
      ball.xspeed*=-1
      console.log("triiggg")
    }

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








function keyPressed(){
  if(key=='p'||key=='P'){
    if(pause){
      pause=false;
      loop();
    }else if(!pause){
      pause=true;
      noLoop();
    }
  }
}