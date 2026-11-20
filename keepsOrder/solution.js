function keepsOrder(scores, next_score) {
  let returnVal

  let scoresLastIndex = scores[scores.length - 1]

  if (scores.length === 0){
    returnVal = true
  } else if (scoresLastIndex <= next_score){
    returnVal = true
  } else {
    returnVal = false
  }
  
  return returnVal;
}
