let game = new Game();
let tower = new Tower(
  "Tower",
  false,
  new Vector(100, 250)
);

//tower.findChild("Cannon").rotateTo(Vector.withValue(90, 0), 2000)
let enemy = new Minion(
  "1",
  false,
  new Vector(2000, 500)
);

// game.gameObjects.push(tower);

game.gameObjects.push(tower);
game.gameObjects.push(enemy);
//game.gameObjects.push(enemy);
game.start();
