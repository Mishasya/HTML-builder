const fsProm = require('fs/promises');
const { join } = require('path');

const copyDir = async () => {
  await fsProm.rm(join(__dirname, 'files-copy'), { recursive: true, force: true });
  const files = await fsProm.readdir(join(__dirname, 'files'));
  await fsProm.mkdir(join(__dirname, 'files-copy'));
  for (const file of files) {
    await fsProm.copyFile(join(__dirname, 'files', file), join(__dirname, 'files-copy', file));
  }
};

copyDir();