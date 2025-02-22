const fsProm = require('fs/promises');
const path = require('path');

(async () => {
  try {
    const files = await fsProm.readdir(path.join(__dirname, 'secret-folder'));
    for (const file of files) {
      const pathToFile = path.join(__dirname, 'secret-folder', file);
      const fileInfo = await fsProm.stat(pathToFile);
      if (fileInfo.isFile()) {
        console.log(`${path.parse(pathToFile).name} - ${path.parse(pathToFile).ext.slice(1)} - ${fileInfo.size} bytes`);
      }
    }
  } catch(error) {
    console.log(error.message);
  }
})();
