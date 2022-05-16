class Dot {
  constructor(steps, color) {
    this.steps = steps;
    this.startPosition = { x: unitsToPx(5), y: unitsToPx(5) };
    this.position = { ...this.startPosition };
    this.size = unitsToPx(1);
    this.currentStep = 0;
    this.isDead = false;
    this.color = color || "grey";
    this.collisionConsequences = {
      wall: () => this.die(),
      obstacle: () => this.die(),
      goalDot: () => console.log("Hit the goal"),
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

      if (this.noMoreSteps) {
        this.die();
      }
    }
  }

  getFitnessScore() {
    // TODO: Get fitness score on update and compare
    const maxDistance = Game.distanceToGoal(this.startPosition);
    const maxSteps = this.steps.length;
    const score =
      -(Game.distanceToGoal(this.position) / maxDistance) +
      this.currentStep / maxSteps;
    return score;
  }

  getMutation(mutationRate) {
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
