const fs = require('fs');
const chalk = require("chalk");

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

//checa o status de cada link analisado
function checkStatus(listOfURLs) {
  return Promise.all(
    listOfURLs.map((url) => {
      return fetch(url)
      .then(response => {
        if (response.ok) {
          return `${chalk.greenBright('☑ OK')} | ${chalk.greenBright(response.status)}`
        } else {
          return `${chalk.redBright('☒ FAIL')} | ${chalk.redBright(response.status)}`
        }
      })
      .catch(error => {
        if (error.cause.code === 'ENOTFOUND') {
          return chalk.redBright('☐ Link não encontrado');
        } else {
          return chalk.redBright('Ocorreu algum erro');
        }
      })
    })
  )
}


//retorna uma lista de objetos com as informações de cada link
function validatedList (listOfLinks) {
  return checkStatus(listOfLinks.map((targetLink) => targetLink.href))
  .then((status) => {
    return listOfLinks.map((object, index) => ({
      ...object,
      status: status[index]
    }));
  });
}

function checkStatusOfLinks (listOfLinks) {
  const totalLinks = listOfLinks.length;
  const uniqueLinks = new Set(listOfLinks.map((targetLink) => targetLink.href)).size;

  return checkStatus(listOfLinks.map((targetLink) => targetLink.href))
  .then((linkStatus) => {
    const brokenLinks = linkStatus.filter(status => status.startsWith(chalk.redBright('☒ FAIL')) || status.startsWith(chalk.redBright('☐ Link não encontrado')) || status.startsWith(chalk.redBright('Ocorreu algum erro'))).length;
    return {totalLinks, uniqueLinks, brokenLinks};
  })

  
}

module.exports = {extractLinks, checkStatus, validatedList, checkStatusOfLinks}

