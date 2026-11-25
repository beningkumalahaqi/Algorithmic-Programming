function backToBackFailures(results) {
  for (let i = 0; i < results.length; i++) {
  if (results[i] === "fail" && results[i + 1] === "fail"){
    return true
    }
  }
  return false;
}
