class Tower extends GameObject {
  constructor(name, graphic, localPosition = Vector.zero, angle = Vector.zero) {
    super(name, graphic, localPosition, angle);
    this.constructParts();
  }

  constructParts() {
    let towerBase = new GameObject("TowerBase", resources.images.tower);

    let cogwheel = new GameObject(
      "Cogwheel",
      resources.images["tower-cogwheel"],
      new Vector(37, -64)
    );

    let cannon = new GameObject(
      "Cannon",
      resources.images.cannon,
      new Vector(-60, -130)
    );
    cannon.origin = new Vector(0.4, 0.8);

    this.addChild(towerBase);
    this.addChild(cogwheel);
    this.addChild(cannon);
  }

  update() {
    super.update();
  }

  draw() {
    super.draw();
  }
}
