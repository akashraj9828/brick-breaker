

function brick(x,y) {
    if(x)
    this.x=x
    if(y)
    this.y=y

    this.hit
    // this.x = width / 2
    // this.y = height / 2
    this.l = width / xscl
    this.h = width / xscl / 3
    
    this.render = function (color) {
      rectMode(CENTER);
      fill(color);
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
