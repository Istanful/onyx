class Particle extends GameObject {
  constructor(name, graphic, lifetime, startingProperties, targetProperties, easingType = "easeInOut") {
    super(name, graphic);
    this.easingType = easingType;
    this.lifetime = lifetime;
    this.setProperties(startingProperties);
    this.animateProperties(targetProperties, lifetime);
  }

  setProperties(properties) {
    for (let key in properties)
      this[key] = properties[key];
  }

  animateProperties(properties, duration) {
    let self = this;
    for (let key in properties)
      this.animate(key, properties[key],
                   this.lifetime, this.easingType,
                   function() { self.destroy() });
  }
}
