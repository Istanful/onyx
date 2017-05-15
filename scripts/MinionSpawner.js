class MinionSpawner {
  constructor() {
    this.minionCount = 0;
    this.spawn();
  }

  spawn() {
    let self = this.constructor.name == "MinionSpawner" ? this : spawner;
    let minion = new Minion("Minion");
    game.addGameObject(minion);
    self.minionCount++;
    setTimeout(self.spawn, MinionSpawner.spawnDelay(minion))
  }

  static spawnDelay(minion) {
    let numberOfBullets = minion.startingHealth / tower.projectileBaseDamage;
    let projectileDuration = (Vector.distance(tower.tipPosition, minion.position)) / tower.projectileSpeed;
    let timeNeeded = (1000 / tower.attackSpeed) * numberOfBullets + projectileDuration;
    return timeNeeded;
  }
}
