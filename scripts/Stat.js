class Stat {
  constructor(name, powerCalculation, costCalculation) {
    this.name = name;
    this.powerCalculation = powerCalculation;
    this.costCalculation = costCalculation;
    this.level = 0;
    this.levelUp();
  }

  // You must later pay for stuff
  levelUp() {
    this.level++;
    let lvl = this.level;
    this.power = eval(this.powerCalculation);
    this.cost = eval(this.costCalculation);
  }
}
