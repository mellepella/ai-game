function clampBetween(num, min, max) {
  if (num > max) {
    return max;
  } else if (num < min) {
    return min;
  }
  return num;
}
