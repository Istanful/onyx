let game = new Game();
let tower = new Tower(
  "Tower",
  false,
  new Vector(100, 250)
);
let spawner = new MinionSpawner();

game.addGameObject(tower);
game.start();
