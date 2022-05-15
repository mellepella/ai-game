const UNITS_PER_WIDTH = 50;
const UNIT_SIZE = getCanvasDimensions().width / UNITS_PER_WIDTH;

function unitsToPx(units) {
  return units * UNIT_SIZE;
}
