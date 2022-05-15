class Game {
  static UPDATE_RATE = 50;
  static updateInterval;
  static goalDot = new GoalDot(unitsToPx(40), unitsToPx(11));
  static currentPopulation = new Population(
    repeat(() => new Dot(getRandomSteps(50)), 500),
    0.3
  );

  static startUpdate() {
    this.updateInterval = setInterval(() => this.update(), this.UPDATE_RATE);
  }

  static stopUpdate() {
    clearInterval(this.updateInterval);
  }

  static update() {
    clearCanvas();
    this.currentPopulation.update();
    this.goalDot.update();
  }

  static distanceToGoal(pos = { x, y }) {
    const deltas = {
      x: this.goalDot.position.x - pos.x,
      y: this.goalDot.position.y - pos.y,
    };
    return Math.abs(Math.sqrt(deltas.x ** 2 + deltas.y ** 2));
  }
}
