const chalk = require('chalk');
const {extractLinks, checkStatus, validatedList, checkStatusOfLinks} = require('../src/validation-stats.js');

describe('extractLinks', () => {
    it('should be a function', async () => {
      expect(typeof extractLinks).toBe('function');
    })
  
    it('should extract all the links of a file', async () => {
      const path = './file/teste2.md';
      const listOfLinks = [
        {
          text: 'Link 1',
          href: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element',
          file: path
        },
        {
          text: 'Link 2',
          href: 'https://medium.com/collabcode/meu-html-%C3%A9-sem%C3%A2ntico-e-o-seu-4e97c81c0c49',
          file: path
        },
        {
          text: 'Teste de retorno 404',
          href: 'https://httpstat.us/404',
          file: path
        },
  
      ];
      const list = await extractLinks(path);
      expect(list).toEqual(listOfLinks);
    });
  
      it('should throw an error for an empty file', async () => {
        const path = './file/empty-test.md';
        const erro = { code: 'ENOENT'};
  
        await expect(extractLinks(path)).rejects.toThrowError(
        `${chalk.redBright(erro.code),'O diretório indicado não possui arquivo' }`
        );
      });
  }) 

  describe('checkStatus', () => {
    it('should return an array with the status of each URL', async () => {
      const listOfURLs = [
        'https://www.youtube.com',
        'https://www.google.com',
        'https://developer.mozilla.org/pt-BR/docs/W',
        'https://www.test09123.com'
      ];
  
      const expectedStatus = [
        `${chalk.greenBright('☑ OK')} | ${chalk.greenBright(200)}`,
        `${chalk.greenBright('☑ OK')} | ${chalk.greenBright(200)}`,
        `${chalk.redBright('☒ FAIL')} | ${chalk.redBright(404)}`,
        `${chalk.redBright('☐ Link não encontrado')}`
      ]
  
      const actualStatus = await checkStatus(listOfURLs);
  
      expect(actualStatus).toEqual(expectedStatus);
    })
  })

  describe('validatedList', () => {
    it('should return a list of valid and invalid links', async () => {
      const listOfLinks = [
        {
          text: 'Google',
          href: 'https://www.google.com'
        },
        {
          text: 'MDN Web Docs',
          href: 'https://developer.mozilla.org/pt-BR/'
        },
        {
          text: 'Teste de retorno 400',
          href: 'https://http.cat/[404]',
        }
      ];
    
      const expectedOutput = [
        {
          text: 'Google',
          href: 'https://www.google.com',
          status: expect.stringContaining('OK')
        },
        {
          text: 'MDN Web Docs',
          href: 'https://developer.mozilla.org/pt-BR/',
          status: expect.stringContaining('OK')
        },
        {
          text: 'Teste de retorno 400',
          href: 'https://http.cat/[404]',
          status: expect.stringContaining('FAIL')
        }
      ];
    
      const result = await validatedList(listOfLinks);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('checkStatusOfLinks', () => {
    it('should return a list with total, unique and broken links', async () => {
      const listOfLinks = [
        { href: 'https://www.youtube.com/', text: 'YouTube' },
        { href: 'https://httpstat.us/404', text: 'Site 404' },
        { href: 'https://www.facebook.com/', text: 'Facebook' },
        { href: 'https://www.youtube.com/', text: 'YouTube' },
      ];
    
      const expectedResult = {
        totalLinks: 4,
        uniqueLinks: 3,
        brokenLinks: 1
      };
      
      const result = await checkStatusOfLinks(listOfLinks);
      expect(result).toEqual(expectedResult);
    });
  });