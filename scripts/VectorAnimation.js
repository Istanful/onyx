class VectorAnimation {
  constructor(gameObject, property, targetValue, duration, easingType = "easeInOut", callback) {
    this.gameObject = gameObject;
    this.property = property;

    // Distance related
    this.targetValue = targetValue;

    // Timing
    this.duration = duration;
    this.easingType = easingType;

    this.started = false;
    this.callback = callback;
  }

  update() {
    this.gameObject[this.property] = this.nextValue;
  }

  // The next position calculated based on current time
  get nextValue() {
    if (!this.started) { this.start() }
    if (this.elapsedTime >= this.duration) {
      if (this.callback) { this.callback(); }
      this.done = true;
      return this.targetValue;
    }
    return Vector.add(this.startValue, this.nextStep);
  }

  // Initialize values. This should be done fist when the animation is supposed to run
  start() {
    this.startingTime = new Date().getTime();
    this.startValue = this.gameObject[this.property];
    this.distance = Vector.subtract(this.targetValue, this.startValue);
    this.started = true;
    this.done = false;
  }

  reset() {
    this.start();
  }

  // Step depicts the next offset to be added to the startValue
  get nextStep() {
    let multiplier = this.multiplier;
    return new Vector(
      this.distance.x * multiplier,
      this.distance.y * multiplier
    )
  }

  // The multiplier used to calculate the next step
  get multiplier() {
    let percentage = this.completionPercentage;
    switch (this.easingType) {
      case "linear":
        return percentage;
      case "easeIn":
        return Math.cos((Math.PI / 2) * percentage - Math.PI) + 1;
      case "easeOut":
        return Math.sin((Math.PI / 2) * percentage);
      case "easeInOut":
        return (Math.sin(Math.PI * percentage - Math.PI / 2) + 1) / 2;
    }
  }

  // Time since movement started
  get elapsedTime() {
    let currentTime = new Date().getTime();
    return currentTime - this.startingTime;
  }

  // Percentage done
  get completionPercentage() {
    return this.elapsedTime / this.duration;
  }

  static from(object, property, keyframe) {
    return new VectorAnimation(object, property, keyframe[0], keyframe[1], keyframe[2] || "easeIn");
  }
}
