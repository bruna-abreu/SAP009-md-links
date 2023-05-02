const chalk = require("chalk");

function checkStatus(listOfURLs) {
  return Promise.all(
    listOfURLs.map((url) => {
      return fetch(url)
      .then(response => {
        if (response.ok) {
          return `${chalk.greenBright('☑ OK')} | ${chalk.greenBright(response.status)}`
        } else {
          return `${chalk.redBright('☒ FAIL')} |  ${chalk.redBright(response.status)}`
        }
      })
      .catch(error => {
        if (error.cause.code === 'ENOTFOUND') {
          return chalk.redBright('☐ Link não encontrado');
        } else {
          return chalk.red('Ocorreu algum erro');
        }
      })
    })
  )
}

function validatedList (listOfLinks) {
  return checkStatus(listOfLinks.map((targetLink) => targetLink.href))
  .then((status) => {
    return listOfLinks.map((object, index) => ({
      ...object,
      status: status[index]
    }));
  });
}


module.exports = {checkStatus, validatedList}