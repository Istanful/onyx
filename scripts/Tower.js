class Tower extends GameObject {
  constructor(name, graphic, localPosition = Vector.zero, angle = 0) {
    super(name, graphic, localPosition, angle);
    this.constructParts();
  }

  constructParts() {
    let towerBase = new GameObject("TowerBase", resources.images.tower);

    let cogwheel = new GameObject(
      "Cogwheel",
      resources.images.towerCogwheel,
      new Vector(37, -64)
    );

    let cannon = new GameObject(
      "Cannon",
      resources.images.cannon,
      new Vector(-60, -130)
    );
    cannon.origin = new Vector(0.36, 0.82);

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
