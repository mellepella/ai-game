function getRandomSteps(amount) {
  return Array(amount)
    .fill(undefined)
    .map(() => getRandomDirection());
}
