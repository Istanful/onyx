class AnimatorState {
  constructor(animationGroups = [], condition) {
    this.condition = condition;
    this.currentAnimationGroupIndex = 0;
    this.animationGroups = animationGroups;
  }

  update() {
    if (!this.animationGroups) { return; }
    this.currentAnimationGroup.update();
  }

  get currentAnimationGroup() {
    let index = this.currentAnimationGroupIndex;
    let currentAnimationGroup = this.animationGroups[index];
    if (currentAnimationGroup.conditionsMet) {
      index = (index + 1) % this.animationGroups.length;
      this.currentAnimationGroupIndex = index;
      currentAnimationGroup = this.animationGroups[index];
    }
    return currentAnimationGroup;
  }

  addAnimationGroup(AnimationGroup) {
    this.animationGroups.push(AnimationGroup);
  }

  get meetsConditions() {
    return this.condition();
  }
}
