class Tower extends GameObject {
  constructor(name, graphic, localPosition = Vector.zero, angle = 0) {
    super(name, graphic, localPosition, angle);
    this.constructParts();

    this.setStats();
    setTimeout(this.shoot, this.attackSpeed);
  }

  setStats() {
    this.stats = [
      new Stat("attackSpeed", "Math.pow(lvl, 2)/100 + 1", "Math.floor(Math.pow(lvl, 2) + 10)"),
      new Stat("damage", "Math.pow(lvl, 2)/10 + 10", "Math.floor(Math.pow(lvl, 2) + 10)"),
      new Stat("criticalHitChance", "Math.pow(lvl, 2)/1000 + 0.2", "Math.floor(Math.pow(lvl, 2) + 10)")
    ];
  }

  levelUp(stat) {
    this.getStat(stat).levelUp();
    // Make sure to save
    SaveManager.save();
  }

  getStat(name) {
    return this.stats.find("name", name);
  }

  getStatPower(name) {
    return this.getStat(name).power;
  }

  /* Compability
  -----------------------------------------------------------------------------------------*/
  get criticalHitChance() { return this.getStatPower("criticalHitChance"); }
  get attackSpeed() { return this.getStatPower("attackSpeed"); }
  get damage() { return this.getStatPower("damage"); }
  /*---------------------------------------------------------------------------------------*/

  get damagePerSecond() {
    return this.attackSpeed * this.projectileBaseDamage;
  }

  get powerLevel() {
    return this.stats.sum("level");
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
    let target = this.targetPosition;
    if (!target) { return; }
    let cannon = this.cannon;

    // Aim at the closest minion
    let y = target.y - this.position.y;
    let x = target.x - this.position.x;
    let angle = Math.atan(y / x).toDegrees();
    let deltaAngle = Math.abs(cannon.angle - angle);

    // If the next minion is close enough. No need to animate the rotation
    if (deltaAngle < 2) { cannon.angle = angle; return; }
    if (!cannon.animations["angle"] || cannon.animations["angle"].done)
      cannon.animate("angle", angle, 600);
  }

  get targetMinion() {
    // Find the closest minion
    let minions = game.findGameObjectsWithTag("Enemy").where("deathMarked", false);
    let closest = minions[0];
    for (let i = 0; i < minions.length; i++)
      if (minions[i].position.x < closest.x)
        closest = minions[i];
    return closest;
  }

  get targetPosition() {
    let minion = this.targetMinion;
    if (!minion) { return; }
    let projectileDuration = this.projectileDuration;

    let x = minion.position.x - minion.velocity * projectileDuration;

    return new Vector(
      x,
      minion.position.y
    );
  }

  get projectileSpeed() {
    return [this.attackSpeed * 2, 3].min();
  }

  get projectileDuration() {
    let minion = this.targetMinion;
    return Vector.distance(this.tipPosition, minion.position) / this.projectileSpeed;
  }

  // How much damage the projectile should deal, taking critical hit chance in account.
  get projectileDamage() {
    let isCriticalHit = Math.random() < this.criticalHitChance;
    let damage = this.projectileBaseDamage;
    if (isCriticalHit)
      damage += 2 * damage * this.criticalHitChance;
    return Math.ceil(damage);
  }

  get projectileBaseDamage() {
    return this.damage;
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
    let target = tower.targetPosition;
    let minion = tower.targetMinion;
    if (!target) {
      setTimeout(tower.shoot, 1000 / tower.attackSpeed);
      return;
    }
    let cannon = tower.cannon;
    let bullet = new Bullet(tower.projectileDamage);
    let duration = tower.projectileDuration;
    bullet.animate("localPosition", target, duration, "linear");
    game.addGameObject(bullet);
    setTimeout(tower.shoot, 1000 / tower.attackSpeed);
    minion.queuedDamage += bullet.damage;
  }

  update() {
    this.aim();
    super.update();
  }

  draw() {
    super.draw();
  }
}
