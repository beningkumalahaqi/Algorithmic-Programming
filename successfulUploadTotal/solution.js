function successfulUploadTotal(uploads) {
  // Write your code here.
  let globalTotalDownload = 0;
  
  for (let i = 0; i < uploads.length; i++) {
    if (uploads[i][1] === true) {
      globalTotalDownload = globalTotalDownload + uploads[i][0]
    }
  }
  return globalTotalDownload;
}
