const fsProm = require('fs/promises');
const path = require('path');

(async () => {
  try {
    await fsProm.rm(path.join(__dirname, 'project-dist', 'bundle.css'), { force: true });
    const files = await fsProm.readdir(path.join(__dirname, 'styles'));
    await fsProm.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '');
    for (const file of files) {
      const pathToFile = path.join(__dirname, 'styles', file);
      const fileInfo = await fsProm.stat(pathToFile);
      if (fileInfo.isFile() && path.parse(file).ext === '.css') {
        const data = await fsProm.readFile(pathToFile);
        await fsProm.appendFile(path.join(__dirname,'project-dist', 'bundle.css'), data.toString());
      }
    }
  } catch(error) {
    console.log(error.message);
  }
})();