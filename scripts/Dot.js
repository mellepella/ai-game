class Dot {
  constructor(steps, color) {
    this.steps = steps;
    this.position = { x: unitsToPx(4), y: unitsToPx(10) };
    this.size = unitsToPx(1);
    this.currentStep = 0;
    this.isDead = false;
    this.color = color || "grey";
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
    return -Game.distanceToGoal(this.position);
  }

  getMutation(mutationRate) {
    const newSteps = [...this.steps];
    for (let i = 0; i < Math.floor(this.steps.length * mutationRate); i++) {
      const randomIndex = Math.floor(Math.random() * this.steps.length);
      newSteps[randomIndex] = getRandomDirection();
    }
    return new Dot(newSteps, "grey");
  }

  checkCollision() {
    const { width, height } = getCanvasDimensions();

    if (
      this.position.x >= width ||
      this.position.x <= 0 ||
      this.position.y >= height ||
      this.position.y <= 0
    ) {
      this.die();
    }
  }

  die() {
    this.isDead = true;
  }

  draw() {
    fillRect(this.size, this.position, this.color);
  }

  move() {
    this.position.x += unitsToPx(this.steps[this.currentStep].x);
    this.position.y += unitsToPx(this.steps[this.currentStep].y);
    this.currentStep++;
  }
}
