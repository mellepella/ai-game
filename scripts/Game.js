class Game {
  static UPDATE_RATE = 1;
  static updateInterval;
  static goalDot = new GoalDot(unitsToPx(40), unitsToPx(7));
  static obstacles = GameObstacles;
  static isPlaying = false;

  static currentPopulation = new Population(
    repeat(() => new Dot(getRandomSteps(500)), 1500)
  );

  static startUpdate() {
    this.isPlaying = true;
    if (this.isPlaying) {
      this.stopUpdate();
    }
    this.updateInterval = setInterval(() => this.update(), this.UPDATE_RATE);
  }

  static stopUpdate() {
    this.isPlaying = false;
    clearInterval(this.updateInterval);
  }

  static changeUpdateRate(rate) {
    this.UPDATE_RATE = clampBetween(rate, 1, 1000);
    if (this.isPlaying) {
      this.stopUpdate();
      this.startUpdate();
    }
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
