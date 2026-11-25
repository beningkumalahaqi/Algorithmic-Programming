function firstUnfinished(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i][1] === false) {
      return tasks[i][0]
    }
  }
  return null;
}
