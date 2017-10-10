
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