class UI {
  static displayResults(results = { score, steps, distance, generation }) {
    const resultsParagraph = document.getElementById("results");
    resultsParagraph.innerHTML = `
      Best score: ${results.score}, 
      Winner steps: ${results.steps}, 
      Distance to goal: ${results.distance}, 
      Generation: ${results.generation}
      `;
  }
}
