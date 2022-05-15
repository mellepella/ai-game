class Obstacle {
  constructor(position = { x, y }, dimensions = { width, height }) {
    this.position = position;
    this.dimensions = dimensions;
    this.color = "black";
  }

  checkCollision(position) {
    return {
      hasCollided:
        position.x >= this.position.x &&
        position.x <= this.position.x + this.dimensions.width &&
        position.y >= this.position.y &&
        position.y <= this.position.y + this.dimensions.height,
      object: "obstacle",
    };
  }

  update() {
    this.draw();
  }

  draw() {
    fillRect(
      this.dimensions.width,
      this.dimensions.height,
      this.position,
      this.color
    );
  }
}
