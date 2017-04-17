class GameObject {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }

  update() {
    this.move();
  }

  move() {
    if (this.movement) { this.position = this.movement.nextPosition(); }
  }

  moveTo(target, duration, easingType = "easeInOut") {
    this.movement = new Movement(this.position, target, duration, easingType);
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(this.position.x, this.position.y, 100, 100);
  }
}
