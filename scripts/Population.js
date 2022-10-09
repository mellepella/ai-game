class Population {
  constructor(dots) {
    this.dots = dots;
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
      new Dot(winnerDot.steps, "red", winnerDot.bestPosition),
    ];
    console.log(
      winnerDot.inheritedBestPosition,
      winnerDot.bestPosition,
      winnerDot.position,
      winnerDot.getMutationRate()
    );
    this.dots = newDots;
    this.generation++;

    UI.displayResults({
      score: winnerDot.getFitnessScore(),
      steps: winnerDot.currentStep,
      distance: Game.distanceToGoal(winnerDot.position),
      generation: this.generation,
    });
  }
}
