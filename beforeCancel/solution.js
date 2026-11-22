function beforeCancel(actions) {
  // Write your code here.
  let returnVal;
  let cancelIndex = actions.indexOf("cancel")
  let endIndex = cancelIndex != -1 ? cancelIndex : actions.length

  returnVal = actions.slice(0, endIndex)
  
  return returnVal;
}
