let game = new Game();
let gs = [];
let easeTypes = ["linear", "easeIn", "easeOut", "easeInOut"];
for (let i = 0; i < 4; i++) {
  gs.push(new GameObject(i, new Vector(0, i * 100)));
  gs[i].rotateTo(new Vector(360, 0), 2000, easeTypes[i]);
  game.gameObjects.push(gs[i]);
}
game.start();
