const fs = require('fs');
const chalk = require('chalk')

function handleError(erro) {
  console.error(chalk.red(erro.code, 'Não há arquivo no diretório'));
} // antes tava throw new Error mas não funcionou 

function takeFile(filePath) {
  const encoding = 'utf-8';
  fs.promises
     .readFile(filePath, encoding)
    .then((text) => console.log(chalk.green(text)))
    .catch((handleError))
}

takeFile('./../SAP009-md-links/teste.md');













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