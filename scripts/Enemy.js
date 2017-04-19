class Enemy extends GameObject {
  constructor(name, graphic, localPosition = new Vector(window.innerWidth, 800), angle = Vector.zero) {
    super(name, graphic, localPosition, angle);
    this.size = Vector.withValue(100);
    this.moveTo(new Vector(-100, 800), 10000, "linear");
  }

  draw() {
    let ctx = game.canvas.getContext("2d");
    ctx.strokeRect(this.position.x, this.position.scaled.y, this.size.scaled.x, this.size.scaled.y);
  }
}
