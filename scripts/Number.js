Number.prototype.toRadians = function () {
  return this * (Math.PI / 180);
}

Number.prototype.toDegrees = function() {
  return this / (Math.PI / 180);
}
