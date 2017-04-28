class Button extends GUIComponent {
  constructor(text, action, key) {
    super(text);
    this.action = action;
    this.key = key;
  }

  trigger() {
    this.action();
  }
}
