function repeat(func, times) {
  let n = 0;
  let returnValues = [];
  while (n < times) {
    returnValues.push(func(n));
    n++;
  }
  return returnValues;
}
