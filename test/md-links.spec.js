//const mdLinks = require('../src/index');
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

  /* it('should retur a list with validate links when the option --validate is being used', async () => {
    const expected = [
      {
        text: 'Link 1',
        href: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element',
        file: './files/teste2.md',
        status: '☑ OK | 200'
      },
      {
        text: 'Link 2',
        href: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%C3%A2ntico-e-o-seu-4e97c81c0c49',
        file: './files/teste2.md',
        status: '☑ OK | 200'
      },
      {
        text: 'Teste de retorno 404',
        href: 'https://httpstat.us/404',
        file: './files/teste2.md',
        status: '☒ FAIL | 404'
      }
    ];
    const result = await mdLinks('./files/teste2.md', { validate: true });
    expect(result).toEqual(expected);
  }); */

})














