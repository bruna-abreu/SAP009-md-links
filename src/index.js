const fs = require('fs') //permite trabalhar com o sistema de arquivos
const chalk = require('chalk');
const {extractLinks, validatedList, checkStatusOfLinks} = require('./validation-stats.js')


function isFile(path) {
  try {
    return fs.lstatSync(path).isFile();
  } catch (error) {
    return false;
  }
}

function isDirectory(path) {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch (error) { 
    return false;
  }
}

//path (caminho do arquivo ou diretório a ser analisado)
//options (um objeto que contém opções para a análise, validate e stats)

//coordena a análise do arquivo ou diretório
function mdLinks(path, options) {
  if (!isFile(path) && !isDirectory(path)) {
    throw new Error('\nArquivo ou diretório não existe');
  }
   if (isDirectory(path)) {
    return fs.promises.readdir(path)
      .then(files => {
        return Promise.all(files.map((fileName) => {
          const filePath = `${path}/${fileName}`;
          return extractLinks(filePath)
            .then(result => {
              return validateOptions (options, result)
            })
        }));
      });
  }
  
  if (isFile(path)) {
    if (!path.endsWith('.md')) {
      //console.log(chalk.redBright('Extensão inválida'));
      throw new Error('Extensão inválida')
    } else {
      return extractLinks(path)
        .then(links => {
          return validateOptions (options, links)
        });
     }
  }
}

function validateOptions (options, links) {
  if (options.stats && options.validate) {
    return checkStatusOfLinks(links)
   } else if (options.stats) {
    return checkStatusOfLinks(links)
   } else if (options.validate) {
     return validatedList(links)
   } else {
     return links
   }
}

module.exports = {isFile, isDirectory, mdLinks};
