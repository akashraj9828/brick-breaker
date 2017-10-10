
var pdlspeed
var brc = []
var bricks = []
var posx
var posy
var xscl = 50
var yscl = 90
var n = 1000
var speed
var r

var pause = false


function setup() {
  createCanvas(windowWidth - 50, windowHeight - 100)
  r = height / 50
  pdlspeed = width / 50
  speed = width / 200
  pdl = new paddle();
  ball = new Ball();
  createBrick();
  // frameRate(7)

}
function draw() {
  background(51);
  
  ball.update()
  ball.wall();
  pdl.show()

  render_bricks();
  key_control();
  collision();
  ball.render();
  
 
}





function render_bricks() {
  for (i = 0; i <bricks.length; i++) {
    stroke(10)
    if(bricks[i].hit){
      bricks[i].render("BLUE")
    }else{
    bricks[i].render("GREEN");
    }
  }
}
function collision() {
  var coll = false
  for (i = 0; i < bricks.length; i++) {
  //   coll = false
  if(!bricks[i].hit){
    if ((ball.x + r > bricks[i].x) && (ball.x - r < bricks[i].x + bricks[i].l)) {     //ball.x in bricks range

      if ((ball.y + r > bricks[i].y) && (ball.y - r < bricks[i].y + bricks[i].h)) {
       bricks[i].hit=true;
        // bricks.splice(i, 1)
        ball.yspeed=-ball.yspeed
      }
    }
  }
  }



  // for (i = 0; i < brc.length; i++) {
  //   if ((ball.bx +r/2< (brc[i].x + (brc[i].l / 2)) && ball.bx +r/2> (brc[i].x - (brc[i].l / 2))) && (ball.by+r/2 > (brc[i].y - (brc[i].h / 2))) && (ball.by +r/2< (brc[i].y + (brc[i].h / 2)))) {
  //     brc.splice(i, 1)
  //     ball.yspeed = -ball.yspeed
  //     // ball.xspeed=-ball.xspeed
  //   }

  //   if ((ball.by+r/2 > (brc[i].y - (brc[i].h))) && (ball.by +r/2< (brc[i].y + (brc[i].h))) && ((ball.bx+r/2==brc[i].x)||(ball.bx+r/2==brc[i].x+brc[i].l))){
  //     ball.xspeed*=-1
  //     console.log("triiggg")
  //   }

  // }
}



function createBrick() {
  posx = width / 5
  posy = height / 3.5
  for (i = 0; i < n; i++) {

   

    bricks[i] = new brick(posx,posy);
    bricks[i].hit=false;
   
    // bricks[i].x = posx
    // bricks[i].y = posy
    
    posx += width / (xscl - 1)
    if (posx > width - width / 5) {
      posy += height / (yscl - 1)
      posx = 200
    }
    // console.log(bricks[i].x)
  }


}








function keyPressed() {
  if (key == 'p' || key == 'P') {
    if (pause) {
      pause = false;
      loop();
    } else if (!pause) {
      pause = true;
      noLoop();
    }
  }
}

function key_control() {
  if (keyIsDown(LEFT_ARROW))
    pdl.update(-pdlspeed)
  if (keyIsDown(RIGHT_ARROW))
    pdl.update(pdlspeed);
}