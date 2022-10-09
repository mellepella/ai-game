const UNIT_SIZE = getCanvasDimensions().width / config.unitsPerWidth;

function unitsToPx(units) {
  return units * UNIT_SIZE;
}
