class GameObject {
  constructor(name, position) {
    this.name = name;
    this.position = position;
    this.velocity = new Vector(1, 2);
  }

  update() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(this.position.x, this.position.y, 100, 100);
  }
}
