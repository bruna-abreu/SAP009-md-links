const chalk = require("chalk");
const {checkStatus} = require('./validation.js')

function checkStatusOfLinks (listOfLinks) {
    const totalLinks = listOfLinks.length;
    const uniqueLinks = new Set(listOfLinks.map((targetLink) => targetLink.href)).size;
  
    return checkStatus(listOfLinks.map((targetLink) => targetLink.href))
    .then((linkStatus) => {
      const brokenLinks = linkStatus.filter(status => status.startsWith(chalk.redBright('☒ FAIL'))).length;
      return {totalLinks, uniqueLinks, brokenLinks};
    })
    .catch((error) => {
      console.log(error)
    });
  }

  module.exports = {checkStatusOfLinks};