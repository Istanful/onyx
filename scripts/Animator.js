class Animator {
  constructor(animatorStates = []) {
    this.animatorStates = animatorStates;
  }

  update() {
    this.currentAnimatorState.update();
  }

  addAnimatorState(animatorState) {
    this.animatorStates.push(animatorState);
  }

  addAnimatorStates(animatorStates) {
    for (let i = 0; i < animatorStates.length; i++) {
      this.addAnimatorState(animatorStates[i]);
    }
  }

  get currentAnimatorState() {
    for (let i = 0; i < this.animatorStates.length; i++) {
      if (this.animatorStates[i].meetsConditions)
        return this.animatorStates[i];
    }
  }
}
