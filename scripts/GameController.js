let game = new Game();
let tower = new Tower(
  "Tower",
  false,
  new Vector(100, 250)
);
tower.findChild("Cannon").rotateTo(Vector.withValue(-45), 2000)
let enemy = new Enemy("1")

// game.gameObjects.push(tower);

game.gameObjects.push(tower);
//game.gameObjects.push(enemy);
game.start();
