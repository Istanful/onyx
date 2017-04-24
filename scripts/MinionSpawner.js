class MinionSpawner {
  constructor() {
    this.minionCount = 0;
    setTimeout(this.spawn(), 1000);
  }

  spawn() {
    let minion = new Minion(this.minionCount);
    game.addGameObject(minion);
    this.minionCount++;
  }
}
