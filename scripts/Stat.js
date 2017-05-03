class Stat {
  constructor(name, powerCalculation, costCalculation) {
    this.name = name;
    this.powerCalculation = powerCalculation;
    this.costCalculation = costCalculation;
    this.setLevel(1);
  }

  // You must later pay for stuff
  levelUp() {
    if (!save || !this.canLevelUp) { return; }
    this.chargeCost();
    this.setLevel(this.level + 1)
  }

  setLevel(lvl) {
    this.level = lvl;
    this.power = eval(this.powerCalculation);
    this.cost = eval(this.costCalculation);
  }

  get canLevelUp() {
    return save.balance >= this.cost;
  }

  chargeCost() {
    save.balance -= this.cost;
  }
}
