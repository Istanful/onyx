class UpgradeButton {
  constructor(label, stat, key) {
    this.label = label;
    this.stat = stat;
    this.key = key;
  }

  get text() {
    let cost = tower.getStat(this.stat).cost;
    return "("+ this.key.toUpperCase() + ") " + this.label + " $" + cost;
  }

  trigger() {
    tower.levelUp(this.stat);
  }
}
