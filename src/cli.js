const {getFile, handleError} = require('./index.js')
const fs = require('fs');
const chalk = require('chalk')

const path = process.argv;
//console.log(path[2]);
//getFile(path[2]);

function processText (path) {
  const result = getFile(path[2])
    .then((result) => {
      console.log(chalk.yellow('Lista de links'), result);
    })
    .catch((error) => {
      handleError(error);
    });
}

processText(path);










