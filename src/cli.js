const {getFile, handleError} = require('./index.js')
const fs = require('fs');
const {validatedList} = require('./validation.js')
const chalk = require('chalk')

const path = process.argv; //valores de argumento 
//console.log(path[2]);
//getFile(path[2]);

/* function linksList(validate, result, identifier ="") {
  if (validate) {
    console.log(
      chalk.yellowBright('Lista validada'),
      chalk.black.bgCyan(identifier),
      validatedList(result))

  } else {
    console.log (
      chalk.yellowBright('Lista de links'),
      chalk.black.bgCyan(identifier),
      result)
    }  
} */

function linksList(validate, result, identifier = "") {
  return new Promise((resolve, reject) => {
    if (validate) {
      validatedList(result)
        .then(status => {
          console.log(
            chalk.yellowBright("Lista validada"),
            chalk.black.bgCyan(identifier),
            status
          );
          resolve(status);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    } else {
      console.log(
        chalk.yellowBright("Lista de links"),
        chalk.black.bgCyan(identifier),
        result
      );
      resolve(result);
    }
  });
}


function processText(arguments) {
  const filePath = arguments[2];
  const validate = arguments[3] === '--validate';

  try {
    fs.lstatSync(filePath);
  } catch (erro) {
      if (erro.code === 'ENOENT') {
        console.log(chalk.red('Arquivo ou diretório não existe'))
        return
      }
  }

  if (fs.lstatSync(filePath).isFile()) {
   getFile(filePath)
      .then((result) => {
        linksList(validate, result)
      })
      .catch((erro) => {
        console.log(chalk.red('Ocorreu um erro com o arquivo informado. Por favor reveja as informações'))
      });
      
    } else if (fs.lstatSync(filePath).isDirectory()) {
   fs.promises.readdir(filePath)
      .then((files) => { 
        files.forEach((fileName => {
         const list = getFile(`${filePath}/${fileName}`)
          .then((list) =>{
            linksList(validate, list, fileName);
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










/* function processText(arguments) {
  const filePath = arguments[2];
  const validate = arguments[3] === '--validate';
  //console.log(validate);
  if (fs.lstatSync(filePath).isFile()) {
    getFile(filePath)
      .then((result) => {
        linksList(validate, result)
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
            linksList(validate, list, fileName);
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
} */




