class GUIPanel {
  constructor() {
    this.GUIComponents = [
      new Button("(A) Attackspeed", function() { tower.levelUp("attackSpeed"); }, "a"),
      new Button("(S) Damage", function() { tower.levelUp("damage"); }, "s"),
      new Button("(D) Critical hit", function() { tower.levelUp("criticalHitChance"); }, "d")
    ];
    document.addEventListener("keydown", function(e) { gui.triggerComponents(e); });
    document.addEventListener("click", function(e) { gui.clickComponents(e); });
  }

  draw() {
    let context = game.canvas.getContext("2d");

    // Set font
    let fontSize = 18;
    context.font = "normal 500 " + fontSize + "px Courier new";
    context.strokeStyle = "white";
    context.fillStyle = "white";
    let textHeight = fontSize / 4;

    // Calculate spacing
    let maxHeight = window.innerHeight - game.floorYPosition.toScaled();
    let spacerSize = maxHeight / 5;
    let height = maxHeight - 2 * spacerSize;
    let y = game.floorYPosition.toScaled() + spacerSize;
    let x = spacerSize;
    let panelCount = this.GUIComponents.length + 1;
    let width = (window.innerWidth - (panelCount + 1) * spacerSize) / panelCount;

    for (let i = 0; i < this.GUIComponents.length; i++) {
      let component = this.GUIComponents[i];

      // Stroke component
      context.strokeRect(x, y, width, height);
      component.size = new Vector(width, height);
      component.position = new Vector(x, y);

      // Fill component with text
      let textWidth = component.text.length * fontSize / 3;
      context.textAlign = "center";
      context.textBaseline = "middle";
      let textY = y + height / 2;
      let textX = x + width / 2;
      context.fillText(component.text, textX, textY);

      x += width + spacerSize;
    }

    this.displayStatistics(x, y, textHeight);
  }

  displayStatistics(x, y, fontHeight) {
    let context = game.canvas.getContext("2d");
    context.textAlign = "start";
    context.textBaseline = "top";
    let lines = [
      "Money: 9999",
      "Total level: 9999",
      "Damage per second: 9999"
    ];

    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i], x, y + 18 * i);
    }
  }

  triggerComponents(event) {
    for (let i = 0; i < this.GUIComponents.length; i++) {
      let component = this.GUIComponents[i];
      if (component.key == event.key)
        component.trigger();
    }
  }

  clickComponents(event) {
    for (let i = 0; i < this.GUIComponents.length; i++) {
      let component = this.GUIComponents[i];
      if (event.pageX < component.position.x + component.size.x &&
          event.pageX > component.position.x &&
          event.pageY > component.position.y &&
          event.pageY < component.position.y + component.size.y) {
            component.trigger();
      }
    }
  }
}
