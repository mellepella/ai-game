function checkProcessingSpeed() {
  const test = () => {
    repeat(() => {
      new Dot(getRandomSteps(500));
    }, 5000);
  };
  console.log("Checking processing speed...");
  const startTime = performance.now();
  test();
  const endTime = performance.now();
  const processingSpeed = endTime - startTime;
  console.log(
    `Processing speed was: ${processingSpeed} ms \n\nTest executed: \n${test}`
  );
  return processingSpeed;
}
