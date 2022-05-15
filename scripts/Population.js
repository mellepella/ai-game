class Population {
  constructor(dots, mutationRate) {
    this.dots = dots;
    this.stepsAmount = this.dots[0].steps.length;
    this.dotsAmount = dots.length;
    this.mutationRate = mutationRate;
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
      ...repeat(
        () => winnerDot.getMutation(this.mutationRate),
        this.dotsAmount - 1
      ),
      new Dot(winnerDot.steps, "red"),
    ];
    console.log(
      `Most steps: ${
        winnerDot.currentStep
      }, Distance to goal: ${Game.distanceToGoal(winnerDot.position)}`
    );

    this.dots = newDots;
  }

  get allDotsDead() {
    return this.dots.every((dot) => dot.isDead);
  }
}
