class Tower extends GameObject {
  constructor(name, graphic, localPosition = Vector.zero, angle = 0) {
    super(name, graphic, localPosition, angle);
    this.constructParts();

    this.attackSpeed = 2;

    // Dummy data
    this.damagePerSecond = this.attackSpeed;

    setTimeout(this.shoot, this.attackSpeed);
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
    this.cannon = cannon;

    this.addChild(towerBase);
    this.addChild(cogwheel);
    this.addChild(cannon);
  }

  aim() {
    let cannon = this.cannon;
    let closest = this.targetMinion;

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

  get targetMinion() {
    // Find the closest minion
    let gameObjects = game.gameObjects;
    let closest = gameObjects[0];

    for (let i = 0; i < gameObjects; i++)
      if (gameObjects[i].tag == "Enemy" && gameObjects[i].position.x < closest.x)
        closest = gameObjects[i];

    return closest;
  }

  // The position of the tip of the cannon
  get tipPosition() {
    let cannon = this.cannon;
    // Subtracting the y position to align with center of tip
    let rotationPoint = new Vector(cannon.relativeRotationPoint.x,
                                   cannon.relativeRotationPoint.y - 22);
    let pipeLength = cannon.size.x - cannon.size.x * cannon.origin.x;
    let angle = cannon.angle.toRadians();
    let delta = new Vector(Math.cos(angle) * pipeLength, Math.sin(angle) * pipeLength);

    return Vector.add(rotationPoint, delta);
  }

  shoot() {
    let minion = tower.targetMinion;
    let cannon = tower.cannon;
    let bullet = new GameObject("Bullet", resources.images.bullet, tower.tipPosition);
    let velocity = tower.attackSpeed;
    let duration = Vector.distance(tower.tipPosition, minion.position) / velocity;
    bullet.animate("localPosition", minion.position, duration, "linear");
    game.addGameObject(bullet);
    setTimeout(tower.shoot, 1000 / tower.attackSpeed);
  }

  update() {
    this.aim();
    super.update();
  }

  draw() {
    super.draw();
  }
}
