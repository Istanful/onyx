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
      this.gameObjects[i].draw();
    }
  }

  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }

  removeGameObject(gameObject) {
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (this.gameObjects[i] == gameObject)
        this.gameObjects.splice(i, 1);
    }
  }

  findGameObjectsWithTag(tag) {
    let gameObjects = [];
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (this.gameObjects[i].tag == tag)
        gameObjects.push(this.gameObjects[i]);
    }
    return gameObjects;
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

  get scale() {
    let height = window.innerHeight;
    return height / 1200;
  }
}
