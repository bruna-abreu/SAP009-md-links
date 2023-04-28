function extractLinks(arrLinks) {
    return arrLinks.map((objectLink) => Object.values(objectLink).join())
}

function validatedList(linksList) {
    const links = extractLinks(linksList);
    //const status = checkStatus(links);
    //console.log(status);
    return links;
}


/* function checkStatus(listURLs) {
    return Promise.all(listURLs.map(url => {
      return fetch(url)
        .then(response => {
          return response.status;
        });
    }));
  } */

  module.exports = {validatedList}













  

/* fetch('https://nodejs.org/api/documentation.json')
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Erro na requisição');
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
 */

/* const res = new Promise((resolve, reject) => {
    fetch('https://nodejs.org/api/documentation.json')
    if (res.ok){
        const data = res.json()
        resolve(console.log(data)) 
    }
}) */

  
/*   function checkStatus(listURLs) {
    const arrStatus = Promise.ll(listURLs.map(url => {
      return fetch(url)
        .then(response => {
          return response.status;
        });
    }));
    return arrStatus;
  }  */

  

