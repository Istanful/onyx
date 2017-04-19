let game = new Game();
let tower = new Tower(
  "Tower",
  false,
  new Vector(100, 250)
);
tower.rotateTo(new Vector(90, 0), 2000);
let enemy = new Enemy("1")

game.gameObjects.push(tower);
//game.gameObjects.push(enemy);
game.start();
