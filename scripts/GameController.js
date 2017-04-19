let game = new Game();
let gs = [];
let easeTypes = ["linear", "easeIn", "easeOut", "easeInOut"];
console.log(resources)
for (let i = 0; i < 4; i++) {
  gs.push(new GameObject(i, resources.cannon, new Vector(0, i * resources.cannon.height)));
  gs[i].rotateTo(new Vector(360, 0), 2000, easeTypes[i]);
  gs[i].moveTo(new Vector(100, 200), 2000);
  game.gameObjects.push(gs[i]);
}
game.start();
