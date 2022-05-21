const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const writeStream = fs.createWriteStream(path.join(__dirname, 'text-02.txt'));

const writeText = () => {
  stdout.write('Введите ваш текст, пожалуйста:');
  stdin.on('data', (data) => {
    if (data.toString().trim() === 'exit') {
      process.exit();
    }
    writeStream.write(data);
  });
  
  process.on('SIGINT', () => {
    process.exit();
  });
  
  process.on('exit', () => stdout.write('Уже уходите? До свидания!'));
};

writeText();