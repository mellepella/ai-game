class Population {
  constructor(dots, id) {
    this.dots = dots;
    this.dotsAmount = dots.length;
    this.generation = 0;
    this.id = id;
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
    const newDots = winnerDot.getMutations(this.dotsAmount - 1);
    this.dots = newDots;
    this.generation++;

    UI.displayResults({
      score: winnerDot.getFitnessScore(),
      steps: winnerDot.currentStep,
      distance: Game.distanceToGoal(winnerDot.bestPosition),
      generation: this.generation,
      mutationRate: winnerDot.getMutationRate(),
      populationNo: this.id,
    });
  }
}
