let game = new Game();
let tower = new Tower(
  "Tower",
  false,
  new Vector(100, 250)
);
//tower.findChild("Cannon").rotateTo(Vector.withValue(90, 0), 2000)
let enemy = new Enemy("1")
tower.animate("localPosition", new Vector(500, 100), 2000);
tower.animate("angle", 90, 2000)
tower.findChild("Cannon").animate("size", Vector.zero, 500)

// game.gameObjects.push(tower);

game.gameObjects.push(tower);
//game.gameObjects.push(enemy);
game.start();
