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
    setTimeout(self.spawn, MinionSpawner.spawnDelay(minion.startingHealth))
  }

  static spawnDelay(minionHealth) {
    let numberOfBullets = minionHealth / tower.projectileDamage;
    let timeNeeded = (1000 / tower.attackSpeed) * numberOfBullets;
    return timeNeeded;
  }
}
