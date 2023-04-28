function extractLinks(arrLinks) {
    return arrLinks.map((objectLink) => Object.values(objectLink).join())
}

/* function validatedList(linksList) {
    const links = extractLinks(linksList);
    const status = checkStatus(links);
    console.log(status);
    return status;
}
 */

function validatedList(linksList) {
    const links = extractLinks(linksList);
    return checkStatus(links)
      .then(status => {
        return status;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
  
  function checkStatus(listURLs) {
    return Promise.all(
      listURLs.map(url => {
        return fetch(url)
          .then(response => {
            return response.status;
          })
          .catch(error => {
            throw error;
          });
      })
    );
  }
  


/* async function checkStatus (listURLs){
    return listURLs.map(async(url) => {
        const response = await fetch(url)
        return response.status; 
    })
} */

/* function checkStatus(listURLs) {
    const promises = listURLs.map((url) => {
      return fetch(url).then((response) => {
        return response.status;
      });
    });
    
    return Promise.all(promises);
  } */
  

/* function checkStatus(listURLs) {
    const promises = listURLs.map(url => fetch(url)
    .then(response => response.status));
    return Promise.all(promises);
  }
   */

/* function checkStatus(listURLs) {
    return Promise.all(listURLs.map(url => {
      return fetch(url)
        .then(response => {
          return response.status;
        });
    }));
  } */

  module.exports = {validatedList}


 /*  async function validatedList(linksList) {
    const links = extractLinks(linksList);
    const status = await checkStatus(links);
    console.log(status);
    return status;
  }

  async function checkStatus (listURLs) {
    const arrStatus = await Promise.all(
      listURLs.map(async (url) => {
        const response = await fetch(url)
          return response.status;
      })
    )
    return arrStatus;
  }
 */









  

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

  

