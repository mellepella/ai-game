class Obstacle {
  constructor(position = { x, y }) {
    this.position = position;
    this.size = unitsToPx(2);
    this.color = "black";
  }

  checkCollision(position) {
    return {
      hasCollided:
        position.x >= this.position.x &&
        position.x <= this.position.x + this.size &&
        position.y >= this.position.y &&
        position.y <= this.position.y + this.size,
      object: "obstacle",
    };
  }

  update() {
    this.draw();
  }

  draw() {
    fillRect(this.size, this.position, this.color);
  }
}
