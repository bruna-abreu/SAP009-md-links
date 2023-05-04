//const mdLinks = require('../src/index');
const fs = require('fs');
const chalk = require('chalk');
const {isFile, isDirectory, mdLinks} = require('../src/index.js');



/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});
 */

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








/* describe('mdLinks', () => {
  test('should return a list of links', async () => {
    const options = { validate: false, stats: false };
    const path = './example.md';

    const result = await mdLinks(path, options);
    expect(result).toEqual([
      { text: 'Link 1', href: 'http://example.com/1', file: './example.md' },
      { text: 'Link 2', href: 'http://example.com/2', file: './example.md' },
    ]);
  });
}); */