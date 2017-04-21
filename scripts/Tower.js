class Tower extends GameObject {
  constructor(name, graphic, localPosition = Vector.zero, angle = 0) {
    super(name, graphic, localPosition, angle);
    this.constructParts();
    this.animator = new Animator();
    let move1 = new VectorAnimation(this.findChild("Cannon"),
                              "localPosition",
                              new Vector(100, 100),
                              500);
    let move2 = new VectorAnimation(this.findChild("Cannon"),
                              "localPosition",
                              new Vector(200, 100),
                              500);
    let move3 = new VectorAnimation(this.findChild("Cannon"),
                              "size",
                              new Vector(0, 0),
                              500);
    let group1 = new AnimationGroup([move1, move2, move3]);
    let move4 = new VectorAnimation(this.findChild("Cannon"),
                              "size",
                              new Vector(100, 100),
                              500);
    let move5 = new Animation(this.findChild("Cannon"),
                              "angle",
                              90,
                              500);
    let group2 = new AnimationGroup([move4, move5]);
    let state1 = new AnimatorState([group1, group2], function() { return 2 > 1 })

    this.animator.addAnimatorState(state1);
  }

  constructParts() {
    let towerBase = new GameObject("TowerBase", resources.images.tower);

    let cogwheel = new GameObject(
      "Cogwheel",
      resources.images.towerCogwheel,
      new Vector(37, -64)
    );

    let cannon = new GameObject(
      "Cannon",
      resources.images.cannon,
      new Vector(-60, -130)
    );
    cannon.origin = new Vector(0.36, 0.82);

    this.addChild(towerBase);
    this.addChild(cogwheel);
    this.addChild(cannon);
  }

  update() {
    super.update();
    this.animator.update();
  }

  draw() {
    super.draw();
  }
}
