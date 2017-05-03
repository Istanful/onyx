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
    if (!this.triggerAble) { return; }
    this.animateBounds();
    tower.levelUp(this.stat);
  }

  animateBounds() {
    let rect = new RectObject("Rect", false);
    rect.fill = true;
    rect.opacity = 0.5;
    rect.size = this.size.unScaled;
    rect.localPosition = this.position.unScaled;
    rect.animate("opacity", 0, 200, "easeOut", function() { rect.destroy(); });
    game.addGameObject(rect);
  }

  get triggerAble() {
    return tower.getStat(this.stat).canLevelUp;
  }

  get opacity() {
    return this.triggerAble ? 1 : 0.5;
  }
}
