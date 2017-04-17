let game = new Game();
let gs = [];
let easeTypes = ["linear", "easeIn", "easeOut", "easeInOut"];
for (let i = 0; i < 4; i++) {
  gs.push(new GameObject(i, new Vector(0, i * 100)));
  gs[i].moveTo(new Vector(500, i * 100, 2), 1000, easeTypes[i]);
  game.gameObjects.push(gs[i]);
}
game.start();
