function serveNext(waiting) {
  let returnVal = [null, []]

  if (waiting.length > 0){
    returnVal = [waiting[0], waiting.slice(1)]
  }
  
  return returnVal;
}
