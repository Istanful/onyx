class Animation extends VectorAnimation {
  constructor(gameObject, property, startValue, targetValue, duration, easingType = "easeInOut") {
    super(gameObject, property, startValue, targetValue, duration, easingType);
    this.delta = this.targetValue - this.startValue;
  }

  get nextValue() {
    if (this.done) { return this.targetValue }
    return this.startValue + this.nextStep;
  }

  get nextStep() {
    let multiplier = this.multiplier;
    return this.delta * multiplier;
  }
}
