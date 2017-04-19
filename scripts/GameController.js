let game = new Game();
let tower = new Tower(
  "Tower",
  false,
  new Vector(100, 250)
);

game.gameObjects.push(tower);
game.start();
