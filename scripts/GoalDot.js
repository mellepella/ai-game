class GoalDot {
  constructor(x, y) {
    this.position = { x, y };
    this.size = unitsToPx(1);
    this.color = "green";
  }

  update() {
    this.draw();
  }

  draw() {
    fillRect(this.size, this.size, this.position, this.color);
  }
}
