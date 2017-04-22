class Minion extends GameObject {
  constructor(name, graphic, localPosition = Vector.zero, angle = 0) {
    super(name, graphic, localPosition, angle);
    this.animator = new Animator();
    this.speed = 1;
    this.velocity = 0.8;
    this.constructParts();
  }

  constructParts() {
    let leftLeg = this.constructLeg("Left");
    let rightLeg = this.constructLeg("Right");
    let leftArm = new GameObject("LeftArm", resources.images.minionArm, new Vector(-10, 65));
    let rightArm = new GameObject("RightArm", resources.images.minionArm, new Vector(-10, 65));
    leftArm.origin = rightArm.origin = new Vector(0.8, 0.4);

    let bodyParts = [
      leftArm,
      leftLeg,
      new GameObject("Body", resources.images.minionBody),
      rightLeg,
      rightArm
    ];
    this.addChildren(bodyParts);
    this.addAnimations();
  }

  addAnimations() {
    let walk = this.walkAnimationGroups;
    let animatorStates = [
      new AnimatorState(walk, function() { return true; })
    ];
    this.animator.addAnimatorStates(animatorStates);
  }

  get walkAnimationGroups() {
    let side, thigh, calve, foot, arm;
    let groups = [];
    let self = this;
    let speed = 500 * this.speed;

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
        [10, speed, "easeOut"],
        [-120, speed, "easeOut"],
        [-5, speed, "easeInOut"]
      ],
      [
        [70, speed, "linear"],
        [70, speed, "linear"],
        [-140, speed, "linear"],
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
    this.stickToBottom();
  }

  stickToBottom() {
    this.localPosition.y = 900 - this.size.y;
    this.localPosition.x -= this.speed * this.velocity;
  }
}
