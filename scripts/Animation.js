class Animation extends VectorAnimation {
  constructor(gameObject, property, targetValue, duration, easingType = "easeInOut", callback) {
    super(gameObject, property, targetValue, duration, easingType, callback);
    this.delta = this.targetValue - this.startValue;
  }

  get nextValue() {
    if (!this.started) { this.start() }
    if (this.elapsedTime >= this.duration) {
      this.done = true;
      return this.targetValue;
    }
    return this.startValue + this.nextStep;
  }

  get nextStep() {
    let multiplier = this.multiplier;
    return this.delta * multiplier;
  }

  start() {
    this.startingTime = new Date().getTime();
    this.startValue = this.gameObject[this.property];
    this.delta = this.targetValue - this.startValue;
    this.started = true;
    this.done = false;
  }

  static from(object, property, keyframe) {
    return new Animation(object, property, keyframe[0], keyframe[1], keyframe[2] || "easeIn");
  }
}
