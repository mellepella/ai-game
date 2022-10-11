class Game {
  static UPDATE_RATE = 1;
  static updateInterval;
  static goalDot = new GoalDot(unitsToPx(95), unitsToPx(20));
  static obstacles = GameObstacles;
  static isPlaying = false;

  static get populationsSize() {
    const desiredProcessSpeedMs = 1000;
    const populationFactor = 1800 / config.noOfPopulations;
    const populationSize = Math.round(
      (desiredProcessSpeedMs / checkProcessingSpeedMs()) * populationFactor
    );
    console.log(`Best fitted population size: ${populationSize}`);
    return populationSize;
  }

  static currentPopulations = repeat(
    (id) =>
      new Population(
        repeat(
          () => new Dot(getRandomSteps(config.dotsStepsAmount)),
          this.populationsSize
        ),
        id
      ),
    config.noOfPopulations
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
    this.currentPopulations.forEach((population) => population.update());
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
