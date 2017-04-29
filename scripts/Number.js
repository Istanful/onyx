Number.prototype.toRadians = function() {
  return this * (Math.PI / 180);
}

Number.prototype.toDegrees = function() {
  return this / (Math.PI / 180);
}

Number.prototype.toScaled = function() {
  return this * game.scale;
}

Number.random = function(first, second) {
  return Math.floor(Math.random() * second) + first;
}
