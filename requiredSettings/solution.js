function requiredSettings(settings, required) {
  let returnval = true;

  for (const name of required) {
    returnval = Object.hasOwn(settings, name)
  }
  
  return returnval;
}
