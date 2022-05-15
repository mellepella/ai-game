function getRandomDirection() {
  const xIndex = Math.round(Math.random() * 2);
  const yIndex = Math.round(Math.random() * 2);
  const deltas = shuffle([0, 1, -1]);
  return { x: deltas[xIndex], y: deltas[yIndex] };
}
