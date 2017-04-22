Array.prototype.min = function () {
  let min = this[0];
  for (let i = 0; i < this.length; i++) {
    if (this[i] < min)
      min = this[i];
  }
  return min;
}

Array.prototype.max = function () {
  let max = this[0];
  for (let i = 0; i < this.length; i++) {
    if (this[i] > max)
      max = this[i];
  }
  return max;
}
