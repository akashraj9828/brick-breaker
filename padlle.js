
function paddle() {
    this.y = height -height/13
    this.x = width / 2
    this.show = function () {
        push();
      rectMode(CENTER);
      fill(255);
      rect(this.x, this.y, width / 7, height / 50);
  pop()
    }
    this.update = function (key) {
  
      this.x += key;
  
    }
  }