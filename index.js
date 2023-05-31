const express = require('express');
const _AXIOS = require('axios');
const _HTTPS = require('https');
const _FS = require('fs');
const _APP = express();

const options = {
 key: _FS.readFileSync('keys/privatekey.pem'),
 cert: _FS.readFileSync('keys/certificate.crt')
};

_APP.get('/samples/api/:subPath', (req, res) => {
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
		  _API_URL = 'https://localhost/northwind-data/api';	  	  
		  break;	  
		case 'north/actuator':
		  _API_URL = 'https://localhost/northwind-data/actuator';	  	  
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

const server = _HTTPS.createServer(options, _APP);

// Start the server
server.listen(443, () => {
  console.log("Server started on port 443");
  console.log("https://localhost/samples/api/coin");
  console.log("https://localhost/samples/api/dog");
  console.log("https://localhost/samples/api/hello?name=Billie");
  console.log("https://localhost/samples/api/nasa");
  console.log("https://localhost/samples/api/north");
  console.log("https://localhost/samples/api/north/actuator");  
});

 