function changedSettings(old, updated) {
  let changedCount = 0
  for (const settingValue in old) {
    if (old[settingValue] !== updated[settingValue]){
      changedCount++
    }
  }
  return changedCount;
}
