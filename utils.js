const path = require("path")

function getFileNameFromUrl(url) {
  if (!url) {
    return "";
  }
  return path.basename(url);
}

module.exports.getFileNameFromUrl = getFileNameFromUrl;