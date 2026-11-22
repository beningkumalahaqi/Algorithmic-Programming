function fillReadings(readings, fallback) {
  let returnVal = [];

  for (let i = 0; i < readings.length; i++) {
    if (readings[i] == null){
      readings[i] = fallback;
    }
  }
  returnVal = readings
  
  return returnVal;
}
