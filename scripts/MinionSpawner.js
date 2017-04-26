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
    setTimeout(self.spawn, (minion.startingHealth / tower.damagePerSecond) * 1000)
  }
}
