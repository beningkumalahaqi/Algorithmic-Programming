function meetingFits(available, meeting) {
  let returnVal

  if (available[0] <= meeting[0] && available[1] >= meeting[1] ){
    returnVal = true
  } else {
    return returnVal = false
  }
  
  return returnVal;
}
