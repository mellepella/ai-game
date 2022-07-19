class Dot {
  constructor(steps, color) {
    this.steps = steps;
    this.startPosition = { x: unitsToPx(5), y: unitsToPx(10) };
    this.position = { ...this.startPosition };
    this.bestPosition = { ...this.startPosition };
    this.size = unitsToPx(1);
    this.currentStep = 0;
    this.isDead = false;
    this.color = color || "grey";
    this.hasWon = false;
    this.collisionConsequences = {
      wall: () => this.die(),
      obstacle: () => this.die(),
      goalDot: () => {
        this.hasWon = true;
        this.die();
      },
    };
  }

  get noMoreSteps() {
    return this.currentStep >= this.steps.length;
  }

  update() {
    if (!this.isDead) {
      this.move();
      this.checkCollision();
      this.draw();
      this.updateBestPosition();

      if (this.noMoreSteps) {
        this.die();
      }
    }
  }

  getFitnessScore() {
    const maxSteps = this.steps.length;
    const stepScore = this.currentStep / maxSteps;
    const bestDistanceScore = this.calculateDistanceScore(this.bestPosition);
    if (this.hasWon) {
      return bestDistanceScore + (1 - stepScore);
    }
    return bestDistanceScore;
  }

  updateBestPosition() {
    const currentScore = this.calculateDistanceScore(this.position);
    const bestScore = this.calculateDistanceScore(this.bestPosition);
    if (currentScore > bestScore) {
      this.bestPosition = this.position;
    }
  }

  calculateDistanceScore(position) {
    const maxDistance = Game.distanceToGoal(this.startPosition);
    const score = -(
      Game.distanceToGoal(position ?? this.position) / maxDistance
    );
    return score;
  }

  getMutationRate() {
    const maxDistance = Game.distanceToGoal(this.startPosition);
    const bestDistance = Game.distanceToGoal(this.bestPosition);
    const mutationRate = clampBetween(
      bestDistance / maxDistance / 1.6,
      0.05,
      1
    );
    return mutationRate;
  }

  getMutation() {
    const mutationRate = this.getMutationRate();
    const newSteps = [...this.steps];
    const mutationAmount = Math.floor(this.steps.length * mutationRate);

    for (let i = 0; i < mutationAmount; i++) {
      const randomIndex = Math.floor(Math.random() * this.steps.length);
      newSteps[randomIndex] = getRandomDirection();
    }
    return new Dot(newSteps, "grey");
  }

  checkCollision() {
    const collisions = Game.getAllCollisions();

    collisions.forEach((collision) => {
      const { hasCollided, object } = collision(this.position);
      if (hasCollided) {
        this.collisionConsequences[object]();
      }
    });
  }

  die() {
    this.isDead = true;
  }

  draw() {
    fillRect(this.size, this.size, this.position, this.color);
  }

  move() {
    this.position.x += unitsToPx(this.steps[this.currentStep].x);
    this.position.y += unitsToPx(this.steps[this.currentStep].y);
    this.currentStep++;
  }
}
