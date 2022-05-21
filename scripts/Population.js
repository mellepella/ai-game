class Population {
  constructor(dots) {
    this.dots = dots;
    this.stepsAmount = this.dots[0].steps.length;
    this.dotsAmount = dots.length;
    this.generation = 0;
  }

  get allDotsDead() {
    return this.dots.every((dot) => dot.isDead);
  }

  update() {
    if (this.allDotsDead) {
      return this.mutateNextGen();
    }
    this.dots.forEach((dot) => dot.update());
  }

  mutateNextGen() {
    const sortedDots = this.dots.sort(
      (a, b) => b.getFitnessScore() - a.getFitnessScore()
    );
    const winnerDot = sortedDots[0];
    const newDots = [
      ...repeat(() => winnerDot.getMutation(), this.dotsAmount - 1),
      new Dot(winnerDot.steps, "red"),
    ];
    console.log(
      `Best score: ${winnerDot.getFitnessScore()}, Winner steps: ${
        winnerDot.currentStep
      }, Distance to goal: ${Game.distanceToGoal(winnerDot.position)}`
    );

    this.dots = newDots;
    this.generation++;
    console.log(`Generation: ${this.generation}`);
  }
}
