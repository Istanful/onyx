class Tower extends GameObject {
  constructor(name, graphic, localPosition = Vector.zero, angle = 0) {
    super(name, graphic, localPosition, angle);
    this.constructParts();

    // Dummy data
    this.damagePerSecond = 2;
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

  aim() {
    let gameObjects = game.gameObjects;
    let cannon = this.findChild("Cannon");

    // Find the closest minion
    let closest = gameObjects[0];
    for (let i = 0; i < gameObjects; i++)
      if (gameObjects[i].tag == "Enemy" && gameObjects[i].position.x < closest.x)
        closest = gameObjects[i];

    // Aim at the closest minion
    let y = closest.position.y - this.position.y;
    let x = closest.position.x - this.position.x;
    let angle = Math.atan(y / x).toDegrees();
    let deltaAngle = Math.abs(cannon.angle - angle);

    // If the next minion is close enough. No need to animate the rotation
    if (deltaAngle < 10) { cannon.angle = angle; return; }
    if (!cannon.animations["angle"] || cannon.animations["angle"].done)
      cannon.animate("angle", angle, 600);
  }

  update() {
    this.aim();
    super.update();
  }

  draw() {
    super.draw();
  }
}
