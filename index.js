
const express = require('express');
const _AXIOS = require('axios');
const _APP = express();

_APP.get('/api/:subPath', (req, res) => {
  const subPath = req.params.subPath;
  let _API_URL = '';  
  console.log('<' + req.method + '>');	
  if (req.method === 'GET') {	 
	  switch(subPath) {
		case 'coin':
		  _API_URL = 'https://api.coinbase.com/v2/currencies';
		  break;
		case 'dog':
		  _API_URL = 'https://dog.ceo/api/breeds/image/random';
		  break;
		case 'hello':
		  res.end(JSON.stringify({ message: "Hello, ${name || 'World'}!" }));
		  break;	  
		case 'nasa':
		  _API_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';	  
		  break;	  
		case 'north':
		  _API_URL = 'http://localhost:8080/northwind-data/api';	  	  
		  break;	  
		case 'north/actuator':
		  _API_URL = 'http://localhost:8080/northwind-data/actuator';	  	  
		  break;
		default:
		  _API_URL = '';
	  }

	  // Make the API call using the _API_URL
	  if (_API_URL !== '') {		
		var stringifiedData = '';
		_AXIOS.defaults.headers.common['Content-Type'] = 'application/json';
		_AXIOS.get(_API_URL)
		  .then((value) => {
			stringifiedData = JSON.stringify(value.data);	
			console.log(stringifiedData);			
			res.write(stringifiedData);
			res.end();
		  })
		  .catch((error) => {
			console.error(error);
		  });		
		_API_URL = '';			
	  } 	  
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: 'Not Found' }));
  }	  
});

// Start the server
_APP.listen(8000, () => {
  console.log('Server started on port 8000');
  console.log('http://localhost:8000/api/coin, /dog, /hello?name=Billie, /nasa, /north, /north/actuator');
});

 