//const mdLinks = require('../src/index');
const fs = require('fs');
const chalk = require('chalk');
const {isFile, isDirectory, mdLinks} = require('../src/index.js');
const assert = require('assert');

describe('isFile', () => {
  it('should be a function', () => {
    expect(typeof isFile).toBe('function');
  });
});

describe('isDirectory', () => {
  it('should be a function', () => {
    expect(typeof isDirectory).toBe('function');
  });
});

describe('mdLinks', () => {

  it('show an error if its not a file', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    mdLinks('./teste.html',{})

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`${chalk.redBright('Arquivo ou diretório não existe')}`);
    //expect(logSpy.mock.calls[0]).toContainEqual(['Arquivo ou diretório não existe']);

    logSpy.mockRestore();
  })

  it('show an error if its not a directory', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    mdLinks('./folder',{})

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`${chalk.redBright('Arquivo ou diretório não existe')}`);
    //expect(logSpy.mock.calls[0]).toContainEqual(['Arquivo ou diretório não existe']);

    logSpy.mockRestore();
  })

  it('show an error if its not a file is not md', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    mdLinks('./file/teste.js',{})

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`${chalk.redBright('Extensão inválida')}`);
    //expect(logSpy.mock.calls[0]).toContainEqual(['Arquivo ou diretório não existe']);

    logSpy.mockRestore();
  })

  it('show an error if its not a file is not md',async () => {
    const logSpy = jest.spyOn(global.console, 'log');
   await mdLinks('./file/teste.md',{validate:false, stats:false})

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`${chalk.redBright('Extensão inválida')}`);
    //expect(logSpy.mock.calls[0]).toContainEqual(['Arquivo ou diretório não existe']);

    logSpy.mockRestore();
  })
})

















