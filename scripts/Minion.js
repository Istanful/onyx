class Minion extends GameObject {
  constructor(name, localPosition, angle = 0) {
    super(name, false, localPosition, angle);

    this.animator = new Animator();
    this.health = this.startingHealth;
    this.queuedDamage = 0;
    this.tag = "Enemy";

    this.localPosition = this.startPosition;
    this.setVelocity();
    this.constructParts();
    this.walkToEndOfScreen();
  }

  // The tower should not shoot at a minion that is already
  // death marked
  get deathMarked() {
    return this.health - this.queuedDamage <= 0;
  }

  get startingHealth() {
    return Math.pow(tower.powerLevel, 2) / 120 + 100;
  }

  get gold() {
    return 10 * tower.powerLevel; // dummy data
  }

  get startPosition() {
    return new Vector(window.innerWidth * (1 / game.scale), this.targetPosition.y);
  }

  walkToEndOfScreen() {
    let deathPosition =  this.targetPosition;
    let distance = Vector.distance(deathPosition, this.position);
    let duration = Minion.walkDuration;
    let target = new Vector(0 - this.findChild("Body").size.x, deathPosition.y);
    duration += Vector.distance(target, deathPosition) / this.velocity;
    this.animate("localPosition", target, duration, "linear", this.destroy);
  }

  setVelocity() {
    let distance = Vector.distance(this.targetPosition, this.position);
    let duration = 10000;
    this.velocity = distance / duration;
  }

  static get walkDuration() {
    return 10000;
  }

  constructParts() {
    let leftLeg = this.constructLeg("Left");
    let rightLeg = this.constructLeg("Right");
    let leftArm = new GameObject("LeftArm", resources.images.minionArm, new Vector(-10, 65));
    let rightArm = new GameObject("RightArm", resources.images.minionArm, new Vector(-10, 65));
    leftArm.origin = rightArm.origin = new Vector(0.8, 0.4);
    let healthBar = new GameObject("HealthBar", resources.images.healthBar, new Vector(0, -10));
    healthBar.opacity = 0;

    let bodyParts = [
      leftArm,
      leftLeg,
      new GameObject("Body", resources.images.minionBody),
      rightLeg,
      rightArm,
      healthBar
    ];
    this.addChildren(bodyParts);
    this.addAnimations();
  }

  addAnimations() {
    let walk = this.walkAnimationGroups;
    let death = this.deathAnimationGroups;
    let self = this;
    let animatorStates = [
      new AnimatorState(walk, function() { return self.health > 0; }),
      new AnimatorState(death, function() { return true; })
    ];
    this.animator.addAnimatorStates(animatorStates);
  }

  get walkAnimationGroups() {
    let side, thigh, calve, foot, arm;
    let groups = [];
    let self = this;
    let speed = 56 / this.velocity;

    let changeSide = function() {
      side = side == "Left" ? "Right" : "Left";
      thigh = self.findChild(side + "Thigh");
      calve = thigh.findChild(side + "Calve");
      foot = calve.findChild(side + "Foot");
      arm = self.findChild(side + "Arm");
    };

    let keyframes = [
      [
        [10, speed],
        [140, speed],
        [-170, speed],
        [0, speed, "easeOut"]
      ],
      [
        [110, speed, "easeOut"],
        [5, speed, "easeOut"],
        [-115, speed, "easeOut"],
        [-5, speed, "easeInOut"]
      ],
      [
        [70, speed, "linear"],
        [40, speed, "linear"],
        [-110, speed, "linear"],
        [0, speed, "easeOut"]
      ],
      [
        [50, speed, "linear"],
        [30, speed, "linear"],
        [-80, speed, "linear"],
        [0, speed, "linear"]
      ]
    ];

    for (let k = 0; k < keyframes.length; k++) {
      let group = new AnimationGroup();
      changeSide();
      group.addAnimations([
        Animation.from(thigh, "angle", keyframes[k][0]),
        Animation.from(calve, "angle", keyframes[k][1]),
        Animation.from(foot, "angle", keyframes[k][2]),
        Animation.from(arm, "angle", keyframes[k][3])
      ]);

      changeSide();
      group.addAnimations([
        Animation.from(thigh, "angle", keyframes[(k+2)%keyframes.length][0]),
        Animation.from(calve, "angle", keyframes[(k+2)%keyframes.length][1]),
        Animation.from(foot, "angle", keyframes[(k+2)%keyframes.length][2]),
        Animation.from(arm, "angle", keyframes[(k+2)%keyframes.length][3])
      ]);
      groups.push(group);
    }

    return groups;
  }

  get deathAnimationGroups() {
    let self = this;
    let duration = Array.randomBetweenOrSingle([600, 1000]);
    let side, thigh, calve, foot, arm;
    let changeSide = function() {
      side = side == "Left" ? "Right" : "Left";
      thigh = self.findChild(side + "Thigh");
      calve = thigh.findChild(side + "Calve");
      foot = calve.findChild(side + "Foot");
      arm = self.findChild(side + "Arm");
    };

    changeSide();
    let parts = [this.findChild("Body"), thigh, calve, foot, arm];
    changeSide();
    parts = parts.concat([thigh, calve, foot, arm]);
    let animations = [];

    for (let i = 0; i < parts.length; i++) {
      animations.push(Animation.from(parts[i], "angle", [Array.randomBetweenOrSingle([90, 720]), duration, "easeOut"]));
      animations.push(VectorAnimation.from(parts[i], "size", [Vector.zero, duration]));
    }
    animations[animations.length - 1].callback = function() { self.destroy(); }
    let group = new AnimationGroup(animations);
    return [group];
  }

  constructLeg(side) {
    let leg = new GameObject(side + "Thigh",
                                resources.images.minionThigh,
                                new Vector(70, 85)
                             );
    leg.origin = new Vector(0.14, 0.6);

    let calve = new GameObject(side + "Calve",
                                  resources.images.minionCalve,
                                  new Vector(25, 0)
                              );
    calve.origin = new Vector(0.1, 0.6);
    leg.addChild(calve);

    let foot = new GameObject(side + "Foot",
                                  resources.images.minionFoot,
                                  new Vector(20, 0)
                              );
    foot.origin = new Vector(0.7, 0.4);
    calve.addChild(foot);

    return leg;
  }

  update() {
    super.update();
    this.animator.update();
    this.handleCollision();
  }

  handleCollision() {
    if (this.health <= 0) { return; }
    let bullets = this.findChild("Body").getCollisionWithTag("Bullet");
    for (let i = 0; i < bullets.length; i++) {
      let bullet = bullets[i];
      this.takeDamage(bullet.damage);
      bullet.destroy();
    }
  }

  takeDamage(damage) {
    this.health -= damage;
    this.queuedDamage -= damage;
    this.animateHealthBar(damage);

    if (this.health <= 0){
      this.rewardPlayer();
      let delta = new Vector(
        Array.randomBetweenOrSingle([50, 200]),
        -Array.randomBetweenOrSingle([10, 30])
      );
      let target = Vector.add(this.localPosition, delta);
      let duration = Vector.distance(this.localPosition, target) / tower.projectileSpeed;
      this.animate("localPosition", target, 600, "easeOut");
    }
  }

  rewardPlayer() {
    save.balance += this.gold;
  }

  animateHealthBar(damage) {
    let healthBar = this.findChild("HealthBar");
    let duration = 1000  * damage / this.startingHealth;
    let multiplier = [0, this.health / this.startingHealth].max();
    healthBar.animate("opacity", 1, duration);
    healthBar.animate("size", new Vector(multiplier * 100, 15), duration);
  }

  // The position where this minion should die
  get targetPosition() {
    return new Vector(tower.position.x + 300, game.floorYPosition - 168);
  }
}
