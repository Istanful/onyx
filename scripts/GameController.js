let game = new Game();
let tower = new Tower(
  "Tower",
  false,
  new Vector(100, 290)
);
let spawner = new MinionSpawner();
let gui = new GUIPanel();

let save;
SaveManager.load();
SaveManager.autoSave();

game.addGameObject(tower);
game.start();
