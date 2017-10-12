
var pdlspeed
var brc = []
var bricks = []
var posx
var posy
var xscl = 50
var yscl = 90
var brick_length
var brick_height
var n = 1000
var speed
var r

var pause = false
var debugging = false;

function setup() {
  createCanvas(windowWidth - 50, windowHeight - 100)
  brick_length = width / xscl
  brick_height = height / yscl
  r = height / 70
  pdlspeed = width / 50
  speed = width / 200
  pdl = new paddle();
  ball = new Ball();
  createBrick();
  // frameRate(7)

}
function draw() {
  background(51);
  collision();
  render_bricks();
  ball.update()
  ball.render();
  pdl.show()

  key_control();

  ball.wall();


}





function render_bricks() {
  stroke(10)//boundary color
  strokeWeight(1)
  for (i = 0; i < bricks.length; i++) {

    if (bricks[i].hit) {
      bricks[i].render(200, 0, 0, 50)
    } else {
      bricks[i].render(0, 255, 0, 50);
    }
  }
}


function collision() {

  br = floor(ball.x + r);   //ball right
  bl = floor(ball.x - r);   //ball left
  bt = floor(ball.x - r);   //ball top
  bb = floor(ball.x + r);   //ball bottom


  for (i = 0; i < bricks.length; i++) {
    //   coll = false
    if (!bricks[i].hit) {
      if ((floor(ball.x + r) == floor(bricks[i].x)) || (floor(ball.x - r) == floor(bricks[i].x + bricks[i].l))) {     //ball.x in bricks range

        if ((ball.y + r > bricks[i].y) && (ball.y - r < bricks[i].y + bricks[i].h)) {
          bricks[i].hit = true;
          // bricks.splice(i, 1)
          ball.xspeed = -ball.xspeed
          console.log("X--",floor(ball.x+r) + "::" + floor(bricks[i].x) + "><" + floor(ball.y+r) + "::" + floor(bricks[i].y))
          // pause=true
          // noLoop();
          return;
        }
      }

      if ((floor(ball.y + r) == floor(bricks[i].y)) || (floor(ball.y - r) == floor(bricks[i].y + bricks[i].h))) {     //ball.x in bricks range

        if ((ball.x + r > bricks[i].x) && (ball.x - r < bricks[i].x + bricks[i].l)) {
          bricks[i].hit = true;
          // bricks.splice(i, 1)
          ball.yspeed = -ball.yspeed
          console.log("Y--"+floor(ball.x) + "::" + floor(bricks[i].x) + "><" + floor(ball.y) + "::" + floor(bricks[i].y))
          // pause=true
          // noLoop();
          return;
        }
      }
    }
  }

  // for (i = 0; i < brick.length; i++) {
  //   if (!bricks[i].hit) {
  //     bx=floor(bricks[i].x);    //brick x
  //     bxl=floor(bx+bricks[i].l)  //brick x+l
  //     by=floor(bricks[i].y)     //brick y
  //     byh=floor(by+bricks[i].h)   //brick y+l

  //     // console.log(bx+":"+by+":"+bt+":"+bb+":"+br+":"+bl)

  //     if ((br == bx) || (bl == bxl)) {     //ball.x in bricks range
  //       console.log("x")
  //       if ((bb > by) && (bt <byh)) {
  //         bricks[i].hit = true;
  //         bricks.splice(i, 1)
  //         ball.xspeed = -ball.xspeed

  //       }
  //     } else
  //       if ((bb ==by) || (bt ==byh)) {     //ball.x in bricks range
  //         console.log("y")
  //         if ((br > bx) && (bl < bxl)) {
  //           bricks[i].hit = true;
  //           bricks.splice(i, 1)
  //           ball.yspeed = -ball.yspeed

  //         }
  //       }
  //   }
  // }






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
  posx = width
  posy = height / 10
  for (i = 0; i < n; i++) {



    bricks[i] = new brick()//posx, posy);
    bricks[i].hit = false;

    bricks[i].x = posx
    bricks[i].y = posy


    if (posx > width - width / 5) {
      posy += brick_height 
      posx = 200
    }
    posx += brick_length  
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