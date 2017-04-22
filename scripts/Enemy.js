class Enemy extends GameObject {
  constructor(name, graphic, localPosition = new Vector(window.innerWidth, 800), angle = 0) {
    super(name, graphic, localPosition, angle);
  }

  draw() {
    let ctx = game.canvas.getContext("2d");
    ctx.strokeRect(this.position.x, this.position.scaled.y, this.size.scaled.x, this.size.scaled.y);
  }

  update() {
    super.update();
  }
}
