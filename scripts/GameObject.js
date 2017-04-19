class GameObject {
  constructor(name, graphic, position = Vector.zero, angle = Vector.zero) {
    this.name = name;
    this.position = position;
    this.angle = angle;
    this.graphic = graphic;

    // The rotation origin. Expressed in 0 to 1 in each dimension.
    // For example (0.5, 0.5) is in the middle.
    this.origin = new Vector(0.5, 0.5);
	  this.size = new Vector(this.graphic.width, this.graphic.height);
  }

  update() {
    if (this.sizeChange)
      this.size = this.sizeChange.nextValue;
    if (this.movement)
      this.position = this.movement.nextValue;
    if (this.rotation)
      this.angle = this.rotation.nextValue;
  }

  moveTo(target, duration, easingType = "easeInOut") {
    this.movement = new VectorAnimation(this.position, target, duration, easingType);
  }

  rotateTo(target, duration, easingType = "easeInOut") {
    this.rotation = new VectorAnimation(this.angle, target, duration, easingType);
  }

  changeSizeTo(target, duration, easingType = "easeInOut") {
	   this.sizeChange = new VectorAnimation(this.size, target, duration, easingType);
  }

  // The point from where to rotate the object
  get rotationPoint() {
    return Vector.add(
      this.position,
      Vector.multiply(this.size, this.origin)
    );
  }

  draw(canvas) {
    let context = canvas.getContext("2d");

    // Use scaled position and size
    let size = this.size.scaled;
    let position = this.position.scaled;
    let rotationPoint = this.rotationPoint.scaled;

    context.save();
    context.strokeStyle = "black";

    // Rotate
    context.translate(rotationPoint.x, rotationPoint.y);
    context.rotate(this.angle.toRadians.x,
                   this.angle.toRadians.x);


    context.drawImage(this.graphic,
                      position.x - rotationPoint.x,
                      position.y - rotationPoint.y,
                      size.x,
                      size.y);

    context.restore();
  }
}
