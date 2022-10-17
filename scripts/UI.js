class UI {
  static displayResults(
    results = { score, steps, distance, generation, populationNo }
  ) {
    const resultsParagraph = document.getElementById(
      `results-population-${results.populationNo}`
    );
    resultsParagraph.innerHTML = `
      Population number: ${results.populationNo},
      Best score: ${results.score}, 
      Winner steps: ${results.steps}, 
      Distance to goal: ${results.distance}, 
      Generation: ${results.generation}
      `;
  }

  static onUpdateRateChange({ target }) {
    Game.changeUpdateRate(target.value);
  }

  static onOnlyDrawWinnerChange({ target }) {
    config.onlyDrawWinner = target.checked;
  }

  static onMutationRateDenominatorChange({ target }) {
    config.mutationRateDenominator = clampBetween(target.value, 0.1, 5);
  }
}
