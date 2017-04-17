class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  static add(first, second) {
    return new Vector(first.x + second.x, first.y + second.y);
  }

  static subtract(first, second) {
    return new Vector(first.x - second.x, first.y - second.y);
  }

  static get zero() {
    return new Vector(0, 0);
  }

  get toRadians() {
    let multiplier = Math.PI / 180;
    return new Vector(this.x * multiplier,
                      this.y * multiplier);
  }
}
