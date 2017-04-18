class Animation extends VectorAnimation {
  constructor(startValue, targetValue, duration, easingType = "easeInOut") {
    super(startValue, targetValue, duration, easingType);
  }

  get nextValue() {
    return super.nextValue.x;
  }
}
