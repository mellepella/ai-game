class Game {
  static UPDATE_RATE = 50;
  static updateInterval;
  static goalDot = new GoalDot(unitsToPx(40), unitsToPx(11));
  static obstacles = [new Obstacle({ x: unitsToPx(30), y: unitsToPx(11) })];
  static currentPopulation = new Population(
    repeat(() => new Dot(getRandomSteps(50)), 500),
    0.3
  );

  static getAllCollisions() {
    const collisions = [
      (position) => {
        return {
          hasCollided: this.distanceToGoal(position) === 0,
          object: "goalDot",
        };
      },
      (position) => {
        return {
          hasCollided:
            position.x >= getCanvasDimensions.width ||
            position.x <= 0 ||
            position.y >= getCanvasDimensions.height ||
            position.y <= 0,
          object: "wall",
        };
      },
      (position) => {
        return this.obstacles[0].checkCollision(position);
      },
    ];
    return collisions;
  }

  static startUpdate() {
    this.updateInterval = setInterval(() => this.update(), this.UPDATE_RATE);
  }

  static stopUpdate() {
    clearInterval(this.updateInterval);
  }

  static update() {
    clearCanvas();
    this.currentPopulation.update();
    this.obstacles.forEach((obstacle) => obstacle.update());
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
