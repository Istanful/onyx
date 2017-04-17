class Rotation extends Movement {
  constructor(startingAngle, targetAngle, duration, easingType = "easeInOut") {
    super(startingAngle, targetAngle, duration, easingType);
  }

  get nextAngle() {
    return super.nextPosition;
  }
}
