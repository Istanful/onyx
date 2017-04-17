class Rotation extends Movement {
  constructor(startingAngle, targetAngle, duration, easingType = "easeInOut") {
    super(startingAngle, targetAngle, duration, easingType);
  }

  nextAngle() {
    return super.nextPosition();
  }
}
