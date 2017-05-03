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

  static multiply(first, second) {
	   return new Vector(first.x * second.x, first.y * second.y);
  }

  static divide(first, second) {
    return new Vector(first.x / second.x, first.y / second.y);
  }

  static get zero() {
    return new Vector(0, 0);
  }

  static withValue(value) {
	  return new Vector(value, value);
  }

  static distance(first, second) {
    return Math.sqrt(
      Math.pow(second.x - first.x, 2),
      Math.pow(second.x - first.x, 2)
    );
  }

  // Returns the same vector scaled to game space
  get scaled() {
	   return Vector.multiply(this, Vector.withValue(game.scale));
  }

  // Returns the same vector unscaled
  get unScaled() {
    return Vector.multiply(this, Vector.withValue((1 / game.scale)));
  }

  // Returns the coordinates with the origin in the bottom left
  get invertedY() {
    return new Vector(this.x, 900 - this.y);
  }
}
