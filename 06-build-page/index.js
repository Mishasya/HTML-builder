const fsProm = require('fs/promises');
const path = require('path');

(async () => {
  try {
    await fsProm.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
    await fsProm.rm(path.join(__dirname, 'project-dist', 'assets'), { recursive: true, force: true });
    const filesStyles = await (fsProm.readdir(path.join(__dirname, 'styles')));
    filesStyles.reverse();
    await fsProm.mkdir(path.join(__dirname, 'project-dist'), { recursive: true});
    await fsProm.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true});
    await copy(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));

    for (const file of filesStyles) {
      const pathToFile = path.join(__dirname, 'styles', file);
      const fileInfo = await fsProm.stat(pathToFile);
      if (fileInfo.isFile() && path.parse(file).ext === '.css') {
        const data = await fsProm.readFile(pathToFile);
        await fsProm.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data.toString());
      }
    }

    await fsProm.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'));
    const components = await fsProm.readdir(path.join(__dirname, 'components'));
    let indexFile = await fsProm.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8');

    for (const component of components) {
      const pathToComponent = path.join(__dirname, 'components', component);
      const reg = `{{${path.parse(pathToComponent).name}}}`;
      const data = await fsProm.readFile(pathToComponent);
      indexFile = indexFile.replace(reg, data.toString());
    }
    await fsProm.writeFile(path.join(__dirname, 'project-dist', 'index.html'), indexFile);

  } catch(error) {
    console.log(error);
  }
})();

async function copy(from, to) {
  try {
    const files = await fsProm.readdir(from, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        await fsProm.copyFile(path.join(from, file.name), path.join(to, file.name));
      } else if (file.isDirectory()) {
        await fsProm.mkdir(path.join(to, file.name));
        await copy(path.join(from, file.name), path.join(to, file.name));
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
