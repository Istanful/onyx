let game = new Game();
let easeTypes = ["linear", "easeIn", "easeOut", "easeInOut"];
let tower = new GameObject("Tower", resources.tower);
//tower.moveTo(new Vector(100, 100), 2000);
let cannon = new GameObject("Cannon", resources.cannon);
tower.rotateTo(new Vector(90, 0), 2000);
tower.addChild(cannon)
game.gameObjects.push(tower);
game.start();
