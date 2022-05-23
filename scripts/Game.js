class Game {
  static UPDATE_RATE = 1;
  static updateInterval;
  static goalDot = new GoalDot(unitsToPx(40), unitsToPx(7));
  static obstacles = [
    new Obstacle(
      { x: unitsToPx(8), y: unitsToPx(13) },
      { width: unitsToPx(2), height: unitsToPx(13) }
    ),
    new Obstacle(
      { x: unitsToPx(27), y: unitsToPx(13) },
      { width: unitsToPx(2), height: unitsToPx(12) }
    ),
    new Obstacle(
      { x: unitsToPx(13), y: unitsToPx(0) },
      { width: unitsToPx(2), height: unitsToPx(13) }
    ),
    new Obstacle(
      { x: unitsToPx(32), y: unitsToPx(0) },
      { width: unitsToPx(2), height: unitsToPx(13) }
    ),
  ];

  static currentPopulation = new Population(
    repeat(() => new Dot(getRandomSteps(500)), 1500)
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
    return this.goalDot.distanceTo(pos);
  }

  static getAllCollisions() {
    const obstacleCollisions = this.obstacles.map(
      (obstacle) => (position) => obstacle.checkCollision(position)
    );
    const collisions = [
      (position) => this.goalDot.checkCollision(position),
      (position) => getCanvasCollision(position),
      ...obstacleCollisions,
    ];
    return collisions;
  }
}
