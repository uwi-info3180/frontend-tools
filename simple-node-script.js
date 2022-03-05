const http = require('http');

http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.end(`<h1>Hello World. This page is running Node.js version: ${process.version}</h1>`);
}).listen(8888, () => {
  console.log('Server listening on port 8888');
});
