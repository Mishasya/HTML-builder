const fsProm = require('fs/promises');
const path = require('path');

(async () => {
  try {
    await fsProm.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
    const filesStyles = await fsProm.readdir(path.join(__dirname, 'styles'));
    await fsProm.mkdir(path.join(__dirname, 'project-dist'));
    for (const file of filesStyles) {
      const pathToFile = path.join(__dirname, 'styles', file);
      const fileInfo = await fsProm.stat(pathToFile);
      if (fileInfo.isFile() && path.parse(file).ext === '.css') {
        const data = await fsProm.readFile(pathToFile);
        await fsProm.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data.toString());
      }
    }
  } catch(error) {
    console.log(error);
  }
})();