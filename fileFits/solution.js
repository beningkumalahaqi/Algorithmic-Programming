function fileFits(capacity, used, size) {
  let returnVar 
  
  if (size <= capacity - used){
    returnVar = true
  } else {
    returnVar = false
  }
  return returnVar;
}
