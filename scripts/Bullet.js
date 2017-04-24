class Bullet extends GameObject {
  constructor(number) {
    super("Bullet" + number, resources.images.bullet, tower.tipPosition);
    this.tag = "Bullet";
  }
}
