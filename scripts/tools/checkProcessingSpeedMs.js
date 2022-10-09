function checkProcessingSpeedMs() {
  const test = () => {
    repeat(() => {
      new Dot(getRandomSteps(config.dotsStepsAmount));
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
