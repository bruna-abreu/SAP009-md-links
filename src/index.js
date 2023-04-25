const fs = require('fs');
const chalk = require('chalk');

function extractLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const captures = [...text.matchAll(regex)];
  const results = captures.map(capture => ({[capture[1]]: capture[2]}))
  return results.length !== 0 ? results : 'não há links no arquivo';
}

function handleError(erro) {
  console.error(chalk.red(erro.code, 'Ocorreu um erro ao ler o arquivo. Por favor confira as informações'));
} // antes tava throw new Error mas não funcionou 

function getFile(filePath) {
  return fs.promises.readFile(filePath, 'utf-8')
    .then((text) => extractLinks(text))
    .catch((erro) => handleError(erro)); 
}

//getFile('./readme.md')

module.exports = {getFile, handleError};






//  \[[^[\]]*?\]
//  \(https?:\/\/[^\s?#.].[^\s]*\)
//  \[[^[\]]*?\]\(https?:\/\/[^\s?#.].[^\s]*\)
//  \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)





/* const chalk = require('chalk')
console.log(chalk.blue('Hello world!'));

const path = require('path')
const fsPromise = require('fs/promises')
const fs = require('fs');

//O módulo fs é usado para ler e escrever arquivos, enquanto o path é usado para manipular caminhos de arquivos e diretórios.

// mostrar o arquivo com extensão md
fsPromise.readdir(path.join(__dirname)).then(files => {
    const mdFiles = files.filter(file => file.endsWith('.md'))
    console.log(mdFiles)
})

// ler o arquivo

fs.readFile('SAP009-md-links/readme.md', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// descobrir a extensão de um arquivo
const extension = path.extname('SAP009-md-links/readme.md');
console.log(extension); 

// obter o conteúdo de um diretório
fs.readdir(__dirname, (err, files) => {
    if (err) throw err;
    console.log(files);
  });
  
// definir rotas
const fullPath = path.join('/Documents/Lab/md-links/', 'SAP009-md-links');
console.log(fullPath);

 */