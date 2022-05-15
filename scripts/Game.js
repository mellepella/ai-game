class Game {
  static UPDATE_RATE = 1;
  static updateInterval;
  static goalDot = new GoalDot(unitsToPx(45), unitsToPx(5));
  static obstacles = [
    new Obstacle(
      { x: unitsToPx(25), y: unitsToPx(13) },
      { width: unitsToPx(2), height: unitsToPx(12) }
    ),
    new Obstacle(
      { x: unitsToPx(15), y: unitsToPx(0) },
      { width: unitsToPx(2), height: unitsToPx(13) }
    ),
    new Obstacle(
      { x: unitsToPx(35), y: unitsToPx(0) },
      { width: unitsToPx(2), height: unitsToPx(12) }
    ),
  ];

  static currentPopulation = new Population(
    repeat(() => new Dot(getRandomSteps(500)), 500),
    0.6
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

  static getAllCollisions() {
    const obstacleCollisions = this.obstacles.map(
      (obstacle) => (position) => obstacle.checkCollision(position)
    );
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
            position.x >= getCanvasDimensions().width ||
            position.x <= 0 ||
            position.y >= getCanvasDimensions().height ||
            position.y <= 0,
          object: "wall",
        };
      },
      ...obstacleCollisions,
    ];
    return collisions;
  }
}
