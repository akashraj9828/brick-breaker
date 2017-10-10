

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
