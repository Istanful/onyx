class AnimationGroup {
  constructor(animations = []) {
    this.animations = animations;
  }

  // Applies all animations
  update() {
    // Loop
    if (this.conditionsMet) { this.reset(); }
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i].update();
    }
  }

  addAnimation(animation) {
    this.animations.push(animation);
  }

  get conditionsMet() {
    // Per default conditions are met when all animations are done
    let done;
    for (let i = 0; i < this.animations.length; i++) {
      done = this.animations[i].done;
    }
    return done;
  }

  reset() {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i].reset();
    }
  }
}
