class Animator {
  constructor() {
    this.loop = true;
    this.currentAnimationStateIndex = 0;
    this.animationStates = [];
  }

  update() {
    if (!this.animationStates) { return; }
    this.currentAnimationState.update();
  }

  get currentAnimationState() {
    let index = this.currentAnimationStateIndex;
    let currentAnimationState = this.animationStates[index];
    if (currentAnimationState.conditionsMet) {
      index = (index + 1) % this.animationStates.length;
      this.currentAnimationStateIndex = index;
      currentAnimationState = this.animationStates[index];
    }
    return currentAnimationState;
  }

  addAnimationState(animationState) {
    this.animationStates.push(animationState);
  }
}
