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

Array.prototype.find = function(property, value) {
  for (let i = 0; i < this.length; i++)
    if (this[i][property] == value)
      return this[i];
}

Array.prototype.sum = function(property) {
  let sum = 0;
  for (let i = 0; i < this.length; i++)
    sum += this[i][property];
  return sum;
}

Array.prototype.where = function(property, value) {
  let collection = [];
  for (let i = 0; i < this.length; i++)
    if (this[i][property] == value)
      collection.push(this[i])
  return collection;
}

Array.randomBetweenOrSingle = function(value) {
  return Array.isArray(value) ? Number.random(value[0], value[1]) : value;
}

Array.prototype.last = function() {
  return this[this.length - 1];
}
