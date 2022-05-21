class Dot {
  constructor(steps, color) {
    this.steps = steps;
    this.startPosition = { x: unitsToPx(5), y: unitsToPx(10) };
    this.position = { ...this.startPosition };
    this.size = unitsToPx(1);
    this.currentStep = 0;
    this.isDead = false;
    this.color = color || "grey";
    this.bestDistanceScore;
    this.hasWon = false;
    this.collisionConsequences = {
      wall: () => this.die(),
      obstacle: () => this.die(),
      goalDot: () => {
        this.hasWon = true;
        console.log("Hit the goal");
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
      this.updateBestDistanceScore();

      if (this.noMoreSteps) {
        this.die();
      }
    }
  }

  getFitnessScore() {
    const maxSteps = this.steps.length;
    const stepScore = this.currentStep / maxSteps;
    if (this.hasWon) {
      return this.bestDistanceScore + (1 - stepScore);
    }
    return this.bestDistanceScore;
  }

  updateBestDistanceScore() {
    const score = this.calculateDistanceScore();
    if (this.bestDistanceScore < score || !this.bestDistanceScore) {
      this.bestDistanceScore = score;
    }
  }

  calculateDistanceScore() {
    const maxDistance = Game.distanceToGoal(this.startPosition);
    const score = -(Game.distanceToGoal(this.position) / maxDistance);
    return score;
  }

  getMutationRate() {
    const maxDistance = Game.distanceToGoal(this.startPosition);
    const currentDistance = Game.distanceToGoal(this.position);
    const mutationRate = clampBetween(
      currentDistance / maxDistance / 2,
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
