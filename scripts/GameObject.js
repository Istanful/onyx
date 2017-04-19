class GameObject {
  constructor(name, graphic, localPosition = Vector.zero, angle = Vector.zero) {
    this.name = name;
    this.localPosition = localPosition;
    this.angle = angle;
    this.graphic = graphic;

    // The children associated with this game object
    this.children = [];

    // The rotation origin. Expressed in 0 to 1 in each dimension.
    // For example (0.5, 0.5) is in the middle.
    this.origin = new Vector(0.5, 0.5);
    if (this.graphic)
	   this.size = new Vector(this.graphic.width, this.graphic.height);
  }

  update() {
    this.updateChildren();
    this.updateProperties();
  }

  updateChildren() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].update();
    }
  }

  updateProperties() {
    if (this.sizeChange)
      this.size = this.sizeChange.nextValue;
    if (this.movement)
      this.localPosition = this.movement.nextValue;
    if (this.rotation)
      this.angle = this.rotation.nextValue;
  }

  moveTo(target, duration, easingType = "easeInOut") {
    this.movement = new VectorAnimation(this.localPosition, target, duration, easingType);
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

  get position() {
    let parentPosition = this.parent ? this.parent.position : Vector.zero;
    return Vector.add(parentPosition, this.localPosition);
  }

  draw() {
    this.drawChildren();
    this.drawThis();
  }

  drawThis() {
    // If this is a game object without a graphic don't draw
    if (!this.graphic) { return; }

    let context = game.canvas.getContext("2d");

    // Use scaled localPosition and size
    let size = this.size.scaled;
    let position = this.position.scaled;
    let rotationPoint = this.rotationPoint.scaled;

    context.save();
    context.strokeStyle = "black";

    // Rotate
    context.translate(rotationPoint.x, rotationPoint.y);
    context.rotate(this.angle.toRadians.x,
                   this.angle.toRadians.y);

    context.drawImage(this.graphic,
                      position.x - rotationPoint.x,
                      position.y - rotationPoint.y,
                      size.x,
                      size.y);

    context.restore();
  }

  drawChildren() {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].draw();
    }
  }

  addChild(gameObject) {
    this.children.push(gameObject);
    gameObject.parent = this;
  }

  findChild(name) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].name == name)
        return this.children[i];
    }
  }
}
