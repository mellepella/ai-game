class GoalDot {
  constructor(x, y) {
    this.position = { x, y };
    this.size = unitsToPx(1);
    this.color = "green";
  }

  distanceTo(position = { x, y }) {
    const deltas = {
      x: this.position.x - position.x,
      y: this.position.y - position.y,
    };
    return Math.abs(Math.sqrt(deltas.x ** 2 + deltas.y ** 2));
  }

  checkCollision(position) {
    return {
      hasCollided: this.distanceTo(position) === 0,
      object: "goalDot",
    };
  }

  update() {
    this.draw();
  }

  draw() {
    fillRect(this.size, this.size, this.position, this.color);
  }
}
