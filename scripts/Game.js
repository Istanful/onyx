class Game {
  constructor() {
    this.canvas = document.getElementById("onyx-canvas");
    this.context = this.canvas.getContext("2d");
    this.gameObjects = [];
  }

  // Starts frame updating
  start() {
    let self = this;
    self.run = function() {
      self.update();
      self.draw();
    }

    self.intervalId = setInterval(self.run, 1000 / 60);
  }

  update() {
    for (let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].update();
    }
  }

  draw() {
    this.clearCanvas();
    for (let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].draw(this.context);
    }
  }

  clearCanvas() {
    let ctx = this.context;

    // Make canvas full screen
    let height = this.canvas.height = window.innerHeight;
    let width = this.canvas.width = window.innerWidth;

    // Fill background
    ctx.fillStyle = "#2F567D";
    ctx.fillRect(0, 0, width, height);
  }
}
