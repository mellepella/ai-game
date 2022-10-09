class Game {
  static UPDATE_RATE = 1;
  static updateInterval;
  static goalDot = new GoalDot(unitsToPx(43), unitsToPx(5));
  static obstacles = GameObstacles;
  static isPlaying = false;

  static get populationSize() {
    const populationSize = Math.round(checkProcessingSpeed() / 5);
    console.log(`Game population size: ${populationSize}`);
    return populationSize;
  }

  static currentPopulation = new Population(
    repeat(() => new Dot(getRandomSteps(500)), this.populationSize)
  );

  static startUpdate() {
    if (this.isPlaying) {
      this.stopUpdate();
    }
    this.isPlaying = true;
    this.updateInterval = setInterval(() => this.update(), this.UPDATE_RATE);
  }

  static stopUpdate() {
    this.isPlaying = false;
    clearInterval(this.updateInterval);
  }

  static changeUpdateRate(rate) {
    this.UPDATE_RATE = clampBetween(rate, 1, 1000);
    if (this.isPlaying) {
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
