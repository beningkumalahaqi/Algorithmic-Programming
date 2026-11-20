function searchStep(numbers, position, target) {
  let returnVal
  if ( target == numbers[position]){
    returnVal = "found"
  } else if (target < numbers[position]){
    returnVal = "left"
  } else {
    returnVal = "right"
  }
  return returnVal;
}
