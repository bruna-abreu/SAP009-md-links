const fs = require('fs') //permite trabalhar com o sistema de arquivos
const chalk = require('chalk');
const {validatedList} = require('./validation.js')
const {checkStatusOfLinks} = require('./stats.js')

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
    .catch((erro) => {throw new Error(chalk.redBright(erro.code, 'O diretório indicado não possui arquivo'))});
}

// fs.lstatSync é usado para verificar informações sobre arquivos e diretórios em um sistema de arquivos Node.js.
//verifica se o caminho recebido como argumento é um arquivo
function isFile(path) {
  try {
    return fs.lstatSync(path).isFile();
  } catch (error) {
    return false;
  }
}

//verifica se o caminho recebido como argumento é um diretório
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
          if (options.stats && options.validate) {
            checkStatusOfLinks(links)
              .then(({ totalLinks, uniqueLinks, brokenLinks }) => {
                console.log(chalk.black.rgb(255, 195, 77)(`\nEstatísticas dos links:\n${chalk.greenBright('Total:')} ${chalk.greenBright(totalLinks)}\n${chalk.magentaBright('Unique:')} ${chalk.magentaBright(uniqueLinks)}\n${chalk.blueBright('Broken:')} ${chalk.blueBright(brokenLinks)}`))
              })
          } else if (options.stats) {
            checkStatusOfLinks(links)
              .then(({ totalLinks, uniqueLinks }) => {
                console.log(chalk.black.rgb(255, 195, 77)(`\nEstatísticas dos links: \n${chalk.greenBright('Total:')} ${chalk.greenBright(totalLinks)}\n${chalk.magentaBright('Unique:')} ${chalk.magentaBright(uniqueLinks)}`))
              })
          } else if (options.validate) {
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
              if (options.stats && options.validate) {
                checkStatusOfLinks(result)
                .then(({totalLinks, uniqueLinks, brokenLinks}) => {
                  console.log(chalk.black.rgb(255, 195, 77)(`\nEstatísticas dos links do arquivo: ${chalk.underline.cyanBright(fileName)} \n${chalk.greenBright('Total:')} ${chalk.greenBright(totalLinks)}\n${chalk.magentaBright('Unique:')} ${chalk.magentaBright(uniqueLinks)}\n${chalk.blueBright('Broken:')} ${chalk.blueBright(brokenLinks)}`))
                })
              } else if (options.stats) {
                checkStatusOfLinks(result)
                  .then(({totalLinks, uniqueLinks}) => {
                    console.log(chalk.black.rgb(255, 195, 77)(`\nEstatísticas dos links do arquivo: ${chalk.underline.cyanBright(fileName)}\n${chalk.greenBright('Total:')} ${chalk.greenBright(totalLinks)}\n${chalk.magentaBright('Unique:')} ${chalk.magentaBright(uniqueLinks)}`))
                  })
              } else if (options.validate) {
                validatedList(result)
                  .then((result) => {
                    console.log(chalk.rgb(255, 195, 77)(`\nLista de links validados: ${chalk.underline.cyanBright(fileName)}\n`)),
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
