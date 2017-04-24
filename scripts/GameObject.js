class GameObject {
  constructor(name, graphic, localPosition = Vector.zero, angle = 0) {
    this.name = name;
    this.localPosition = localPosition;
    this.angle = angle;
    this.graphic = graphic;

    // The children associated with this game object
    this.children = [];

    // The rotation origin. Expressed in 0 to 1 in each dimension.
    // For example (0.5, 0.5) is in the middle.
    this.origin = new Vector(0.5, 0.5);

    this.animations = {};
    if (this.graphic)
      this.size = new Vector(this.graphic.width, this.graphic.height)
    else
      this.size = Vector.zero;
  }

  // Returns the points of the box occupied in the world space
  // Note to self: This is only local since the relativeRotationPoint of
  // children only can be calculated when the parent knows its' size.
  get boundingBox() {
    let points = [];
    for (let i = 0; i < 4; i++) {
      // Calculate the "delta" which is the coordinates from the rotationPoint
      let x = i < 2 ? this.size.x - this.size.x * this.origin.x : -this.size.x * this.origin.x;
      let y = i%2 == 0 ? this.size.y - this.size.y * this.origin.y : -this.size.y * this.origin.y;
      let bisectris = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      let angle = Math.atan(x/y) - this.angle.toRadians();

      let delta = new Vector(
        Math.sin(angle) * bisectris,
        Math.cos(angle) * bisectris
      );

      // Calculate the point which is a position delta from the rotationPoint
      let point;
      if (i%2 == 0)
        point = Vector.add(this.relativeRotationPoint, delta);
      else
        point = Vector.subtract(this.relativeRotationPoint, delta);
      points.push(point);
    }

    return points;
  }

  setSize() {
    if (this.graphic)
      this.size = new Vector(this.graphic.width, this.graphic.height);
    else
      this.size = this.childrenSize;
  }

  get childrenSize() {
    if (this.children.length == 0) { return Vector.zero; }
    let xMin, xMax, yMin, yMax;
    xMin = xMax = this.children[0].boundingBox[0].x;
    yMin = yMax = this.children[0].boundingBox[0].y;

    for (let i = 0; i < this.children.length; i++) {
      let points = this.children[i].boundingBox;
      for (let p = 0; p < points.length; p++) {
        let point = points[p];
        xMin = [xMin, point.x].min();
        yMin = [yMin, point.y].min();
        xMax = [xMax, point.x].max();
        yMax = [yMax, point.y].max();
      }
    }

    return new Vector(xMax - xMin, yMax - yMin);
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
    for (let key in this.animations) {
      // Dispose of done animations
      if (this.animations[key].done) { delete this.animations[key]; continue; }
      this.animations[key].update();
    }
  }

  animate(property, target, duration, easingType = "easeInOut") {
    let animation;

    if (target.constructor.name == "Vector")
      animation = new VectorAnimation(this, property, target, duration, easingType);
    else
      animation = new Animation(this, property, target, duration, easingType);

    this.animations[property] = animation;
  }

  moveTo(target, duration, easingType = "easeInOut") {
    this.movement = new VectorAnimation(this.localPosition, target, duration, easingType);
  }

  rotateTo(target, duration, easingType = "easeInOut") {
    this.rotation = new Animation(this.angle, target, duration, easingType);
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

  // The point from which to rotate around
  // after the parent is rotated
  get relativeRotationPoint() {
    if (!this.parent) { return this.rotationPoint; }
    let distanceFromParentY = this.rotationPoint.y - this.parent.relativeRotationPoint.y;

    let parentAngle = this.parent.angle;
    let delta = Vector.withValue(distanceFromParentY * Math.sin(parentAngle.toRadians()));
    return Vector.add(this.rotationPoint, delta);
  }

  get position() {
    let parentPosition = this.parent ? this.parent.position : Vector.zero;
    return Vector.add(parentPosition, this.localPosition);
  }

  // Loops through the hierarchy and returns all parents of this object
  get parents() {
    let parent = this.parent;
    let parents = [];
    if (!this.parent) { return false; }
    while (parent) {
      parents.push(parent);
      parent = parent.parent;
    }

    return parents;
  }

  get bounds() {
    let origin = new Vector(0.5, 0.5);
    return Vector.multiply(
      this.size,
      origin
    );
  }

  debugGizmos() {
    let context = game.canvas.getContext("2d");
    let size = this.size.scaled;
    let position = this.position.scaled;
    let rotationPoint = this.relativeRotationPoint.scaled;
    let boundingBox = this.boundingBox;

    // The rotation point
    context.strokeStyle = "green";
    context.strokeRect(rotationPoint.x, rotationPoint.y, 5, 5)

    // The hitbox
    context.strokeStyle = "black";
    context.strokeRect(position.x, position.y, size.x, size.y);

    // The boundingBox
    context.strokeStyle = "red";
    context.beginPath();
    context.moveTo(boundingBox[0].scaled.x, boundingBox[0].scaled.x);
    for (let i = 0; i < boundingBox.length; i++) {
      context.strokeRect(boundingBox[i].scaled.x, boundingBox[i].scaled.y, 5, 5);
    }
    context.stroke();

    if (!this.graphic) { return; }
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
    let rotationPoint = this.relativeRotationPoint.scaled;

    context.save();
    this.rotateContext();

    context.drawImage(this.graphic,
                      position.x - rotationPoint.x,
                      position.y - rotationPoint.y,
                      size.x,
                      size.y);

    context.restore();
    context.strokeStyle = "white";
    context.strokeRect(-10, 615, 5000, 1000);
  }

  // The context need to be rotated according to parent
  inheritAngle(parent) {
    let context = game.canvas.getContext("2d");
    let rotationPoint = parent.relativeRotationPoint.scaled;
    context.translate(rotationPoint.x,
                      rotationPoint.y);
    context.rotate(parent.angle.toRadians());
    context.translate(-rotationPoint.x,
                      -rotationPoint.y);
  }

  // Find all parents and inherit their angles
  recursivelyInheritAngle() {
    let parents = this.parents;
    for (let i = parents.length - 1; i >= 0; i--) {
      this.inheritAngle(parents[i]);
    }
  }

  rotateContext() {
    let context = game.canvas.getContext("2d");
    let rotationPoint = this.relativeRotationPoint.scaled;

    // We must rotate the context based on every
    // parent first.
    this.recursivelyInheritAngle();

    // And after that rotate around this ones
    context.translate(rotationPoint.x, rotationPoint.y);
    context.rotate(this.angle.toRadians());
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

  addChildren(gameObjects) {
    for (let i = 0; i < gameObjects.length; i++){
      this.addChild(gameObjects[i]);
    }
  }

  findChild(name) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].name == name)
        return this.children[i];
    }
  }
}
