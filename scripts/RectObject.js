class RectObject extends GameObject {
  drawThis() {
    let context = game.canvas.getContext("2d");

    // Use scaled localPosition and size
    let size = this.size.scaled;
    let position = this.position.scaled;
    let rotationPoint = this.relativeRotationPoint.scaled;

    context.save();
    this.rotateContext();

    if (this.opacity || this.opacity == 0)
      context.globalAlpha = this.opacity;

    context.strokeStyle = "white";
    context.fillStyle = "white";

    if (this.stroke) {
      context.strokeRect(position.x - rotationPoint.x,
                         position.y - rotationPoint.y,
                         size.x,
                         size.y);
    }
    else if (this.fill) {
      context.fillRect(position.x - rotationPoint.x,
                       position.y - rotationPoint.y,
                       size.x,
                       size.y);
    }

    context.restore();
  }
}
