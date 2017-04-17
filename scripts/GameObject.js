class GameObject {
  constructor(name, position = Vector.zero, angle = Vector.zero) {
    this.name = name;
    this.position = position;
    this.angle = angle;

    // The rotation origin. Expressed in 0 to 1 in each dimension.
    // For example (0.5, 0.5) is in the middle.
    this.origin = new Vector(0.5, 0.5);

    // TODO change this
    this.width = 100;
    this.height = 100;
  }

  update() {
    this.move();
    this.rotate();
  }

  move() {
    if (this.movement) {
      this.position = this.movement.nextPosition();
    }
  }

  rotate() {
    if (this.rotation) {
      this.angle = this.rotation.nextAngle();
    }
  }

  moveTo(target, duration, easingType = "easeInOut") {
    this.movement = new Movement(this.position, target, duration, easingType);
  }

  rotateTo(target, duration, easingType = "easeInOut") {
    this.rotation = new Rotation(this.angle, target, duration, easingType);
  }

  // The point from where to rotate the object
  get rotationPoint() {
    let x = this.position.x;
    let y = this.position.y;

    return new Vector(x + this.width * this.origin.x,
                      y + this.height * this.origin.y)
  }

  draw(canvas) {
    let context = canvas.getContext("2d");
    context.save();
    context.strokeStyle = "black";

    // Rotate
    context.translate(this.rotationPoint.x, this.rotationPoint.y);
    context.rotate(this.rotation.nextAngle().x * (Math.PI / 180));

    context.strokeRect(this.position.x - this.rotationPoint.x,
                     this.position.y - this.rotationPoint.y,
                     this.width,
                     this.height);

    // Rotate back
    context.translate(this.rotationPoint.x, this.rotationPoint.y);
    context.restore();
  }
}
