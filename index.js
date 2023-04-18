  var _urlAPI = '';
const _HTTP = require('http');
const _AXIOS = require('axios');
const _URL = require('url');
const _QS = require('querystring');

const server = _HTTP.createServer((req, res) => {
  const { pathname, query } = _URL.parse(req.url);
  const { name } = _QS.parse(query);
  if (req.method === 'GET') {	  
	  switch (pathname) {
		  case '/coin': 			  
		  	_urlAPI = 'https://api.coinbase.com/v2/currencies';
			break;		  
		  case '/dog': 			
			_urlAPI = 'https://dog.ceo/api/breeds/image/random';
			break;		  
		  case '/hello': 
			res.end(JSON.stringify({ message: `Hello, ${name || 'World'}!` }));
			break;
		  case '/nasa': 			
			_urlAPI = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
			break;					
		  case '/north': 			
			_urlAPI = 'http://localhost:8080/northwind-data/api';		  
			break;		
		  case '/north/actuator': 			
			_urlAPI = 'http://localhost:8080/northwind-data/actuator';		  
			break;			
		  default: 
		    break;		
	  } 
	  if (_urlAPI !== '') {		
		var stringifiedData = '';
		_AXIOS.defaults.headers.common['Content-Type'] = 'application/json';
		_AXIOS.get(_urlAPI)
		  .then((value) => {
			stringifiedData = JSON.stringify(value.data);	
			console.log(stringifiedData);			
			res.write(stringifiedData);
			res.end();
		  })
		  .catch((error) => {
			console.error(error);
		  });		
		_urlAPI = '';			
	  }
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
  console.log('/coin, /dog, /hello?name=Billie, /nasa, /north, /north/actuator');
});


