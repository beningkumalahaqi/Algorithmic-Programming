function shouldRetry(failed, attempts, limit) {

  if (failed && attempts < limit){
    return true
  }
  
  return false;
}
