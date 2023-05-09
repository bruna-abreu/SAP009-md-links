const fs = require('fs');
const chalk = require('chalk');
const {isFile, isDirectory, mdLinks} = require('../src/index.js');

describe('isFile', () => {
  it('should be a function', () => {
    expect(typeof isFile).toBe('function');
  });

  it('isFile returns true for a valid file path', () => {
    const filePath = './files/teste2.md';
    expect(isFile(filePath)).toBe(true);
  });
});

describe('isDirectory', () => {
  it('should be a function', () => {
    expect(typeof isDirectory).toBe('function');
  });

  it('isDirectory returns true for a valid directory path', () => {
    const directoryPath = './files/';
    expect(isDirectory(directoryPath)).toBe(true);
  });
});


describe('mdLinks', () => {
  
  it('should throw an error if file or directory dont exist', () => {
    expect(() => mdLinks('dont-exist.md')).toThrowError('Arquivo ou diretório não existe');
  });

  it('should throw an error if file or directory is not md', () => {
    expect(() => mdLinks('./files/teste.js')).toThrowError('Extensão inválida');
  });

  it('should return a list of links', () => {
    expect.assertions(1);
    return mdLinks('./files/teste2.md', {}).then(result => {
      expect(result).toEqual([
        {
          href: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element',
          text: 'Link 1',
          file: './files/teste2.md'
        },
        {
          href: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%C3%A2ntico-e-o-seu-4e97c81c0c49',
          text: 'Link 2',
          file: './files/teste2.md'
        },
        {
          href: 'https://httpstat.us/404',
          text: 'Teste de retorno 404',
          file: './files/teste2.md'
        }
      ]);
    });
  });
  
  it('should validate links and return stats if --validate and --stats option are being used', async () => {
    const options = { validate: true, stats: true };
    const result = await mdLinks('./files/teste2.md', options);
    expect(result).toHaveProperty('totalLinks', 3);
    expect(result).toHaveProperty('uniqueLinks', 3);
    expect(result).toHaveProperty('brokenLinks', 1);
  });
 
  it('should return stats if --stats option is being used', async () => {
    const options = { stats: true };
    const result = await mdLinks('./files/teste2.md', options);
    expect(result).toHaveProperty('totalLinks', 3);
    expect(result).toHaveProperty('uniqueLinks', 3);
  });


  it('should return validated links if --validate option is being used', async () => {
    const options = { validate: true };
    const result = await mdLinks('./files/teste.md', options);
    expect(result).toEqual([
      {
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element',
        text: 'Link 1 válido',
        file: './files/teste.md',
        status: `${chalk.greenBright('☑ OK')} | ${chalk.greenBright(200)}`
      },
      {
        href: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%C3%A2ntico-e-o-seu-4e97c81c0c49',
        text: 'Link 2 válido',
        file: './files/teste.md',
        status: `${chalk.greenBright('☑ OK')} | ${chalk.greenBright(200)}`
      },
      {
        href: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%',
        text: 'Link 3 inválido',
        file: './files/teste.md',
        status: `${chalk.redBright('☒ FAIL')} | ${chalk.redBright(400)}`
      },
      {
        href: 'https://httpstat.us/404',
        text: 'Teste de retorno 404',
        file: './files/teste.md',
        status: `${chalk.redBright('☒ FAIL')} | ${chalk.redBright(404)}`
      },
      {
        href: 'http://gatinhosalsicha.com.br/',
        text: 'gatinho salsicha',
        file: './files/teste.md',
        status: `${chalk.redBright('☐ Link não encontrado')}`
      },
      ]);
  })

  it('should return an array of promises when given a directory', () => {
    const path = './files';
    const options = { validate: true, stats: false };
    return mdLinks(path, options).then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(4); //qntd de arquivos dentro da pasta
      expect(result[0]).toBeInstanceOf(Array);
    });
  });
});














