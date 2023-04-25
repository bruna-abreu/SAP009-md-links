const {getFile, handleError} = require('./index.js')
const fs = require('fs');
const chalk = require('chalk')

const path = process.argv;
//console.log(path[2]);
//getFile(path[2]);

function linksList(result, identifier ="") {
  console.log(
    chalk.yellow('Lista de links'),
    chalk.black.bgGreen(identifier),
    result);
}

function processText(arguments) {
  const filePath = arguments[2];
  if (fs.lstatSync(filePath).isFile()) {
    getFile(filePath)
      .then((result) => {
        linksList(result)
      })
      .catch((erro) => {
        console.log(chalk.red('Ocorreu um erro com o arquivo informado. Por favor reveja as informações'))
      });
  } else if (fs.lstatSync(filePath).isDirectory()) {
    fs.promises.readdir(filePath)
      .then((files) => {
        files.forEach((fileName => {
          getFile(`${filePath}/${fileName}`)
          .then((list) =>{
            linksList(list, fileName);
          })
          .catch((erro) => {
            console.log(chalk.red('Ocorreu um erro com o diretório informado. Por favor reveja as informações'))
          })
        }))
        //console.log(files);
      })
      .catch((erro) => {
        handleError(erro);
      });
  }
}

processText(path);










