const fs = require('fs')
const chalk = require('chalk');
const {validatedList} = require('./validation.js')

function extractLinks(filePath) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  return fs.promises.readFile(filePath, 'utf-8')
    .then((text) => {
      const captures = [...text.matchAll(regex)];
      const results = captures.map((capture) => ({
        text: capture[1],
        href: capture[2],
        file: filePath
      }));
      return results;
    })
    .catch((erro) => {throw new Error(chalk.red(erro.code, 'O diretório não possui arquivo'))});
}

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

function mdLinks(path, options) {
  if (!isFile(path) && !isDirectory(path)) {
    console.log(chalk.redBright('Arquivo ou diretório não existe'));
    return;
  }

  if (isFile(path)) {
    if (!path.endsWith('.md')) {
      extractLinks(path);
      console.log(chalk.redBright('Extensão inválida'));
    } else {
      extractLinks(path)
        .then(links => {
          if (options.validate) {
            validatedList(links)
              .then((category) => {
                console.log(chalk.black.rgb(255, 195, 77)('Lista de links validados:\n')),
                category.map(({text, href, file, status}) => console.log(`${chalk.greenBright(file)} | ${chalk.magentaBright(text)} | ${chalk.blueBright(href)} | ${status} `))
              });
          } else if (links.length === 0) {
            console.log(chalk.redBright('\n', 'Não há links no arquivo'))
            } else {
              console.log(chalk.black.bgRgb(255, 195, 77)('Lista de links:')),
              links.map(({text, href, file}) => console.log(` \n texto: ${chalk.magentaBright(text)} \n link: ${chalk.blueBright(href)} \n diretório: ${chalk.greenBright(file)}`));
              }
        });
    }
  }

  

   if (isDirectory(path)) {
    fs.promises.readdir(path)
      .then(files => {
        files.forEach((fileName) => {
          const filePath = `${path}/${fileName}`;
          extractLinks(filePath)
            .then(result => {
              if (options.validate) {
                validatedList(result)
                  .then((result) => {
                    console.log(chalk.rgb(255, 195, 77)(`\n Lista de links validados: ${chalk.black.bgCyanBright(fileName)}\n`)),
                    result.map(({text, href, file, status}) => console.log(`${chalk.greenBright(file)} | ${chalk.magentaBright(text)} | ${chalk.blueBright(href)} | ${status} `))
                  });
              } else if (result.length === 0) {
                console.log(chalk.redBright(`\n Não há links no arquivo ${chalk.underline.redBright(fileName)}`))
                } else {
                console.log(chalk.black.bgRgb(255, 195, 77)('\n Lista de links:'),
                chalk.cyanBright(fileName)),
                result.map(({text, href, file}) => console.log(`\n texto: ${chalk.magentaBright(text)} \n link: ${chalk.blueBright(href)} \n diretório: ${chalk.greenBright(file)}`));
              }
            })
        });
      });
  }
}


module.exports = {mdLinks};
