class Movement {
  constructor(startingPosition, targetPosition, duration, easingType = "easeInOut") {
    // Distance related
    this.startingPosition = startingPosition;
    this.targetPosition = targetPosition;
    this.distance = Vector.subtract(targetPosition, startingPosition);

    // Timing
    this.duration = duration;
    this.easingType = easingType;
    this.startingTime = new Date().getTime();
  }

  // The next position calculated based on current time
  nextPosition() {
    if (this.done) { return this.targetPosition }
    return Vector.add(this.startingPosition, this.nextStep());
  }

  // Step depicts the next offset to be added to the startingPosition
  nextStep() {
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

  // Determines if movement is made
  get done() {
    return this.elapsedTime >= this.duration;
  }
}
