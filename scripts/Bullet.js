class Bullet extends GameObject {
  constructor(damage) {
    super("Bullet", resources.images.bullet, tower.tipPosition);
    this.tag = "Bullet";
    this.damage = damage;
  }
}
