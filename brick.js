

function brick(x,y) {
    if(x)
    this.x=x
    if(y)
    this.y=y

    this.hit
    // this.x = width / 2
    // this.y = height / 2
    this.l =brick_length
    this.h = brick_height
    
    this.render = function (r,g,b,a) {
    //   rectMode(CENTER);
      fill(r,g,b,a);
      rect(this.x, this.y, this.l, this.h)// height/yscl);
    //   push()
    //   strokeWeight(3)
    //   stroke(100)
    //   fill(255)
    //   ellipse(this.x,this.y,2,2)
    //   pop()
    }
  }
  
  
// function keyPressed(){
//   // if (keyCode==LEFT_ARROW){//||key="a"||key="A"){
//   //   pdl.update(-1);
//   // }
//   //
//   //   if (keyCode==RIGHT_ARROW){//||key="d"||key="D"){
//   //     pdl.update(1);
//   //   }
//  //  if (keyIsDown(LEFT_ARROW))
//  //  pdl.update(-1)
//  //
//  // if (keyIsDown(RIGHT_ARROW))
//  //   pdl.update(1);
// }
