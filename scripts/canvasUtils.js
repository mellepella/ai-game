function fillRect(size, position = { x: 10, y: 10 }, color) {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(position.x, position.y, size, size);
}

function clearCanvas() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getCanvasDimensions() {
  const { width, height } = document.querySelector("canvas");
  return { width, height };
}
