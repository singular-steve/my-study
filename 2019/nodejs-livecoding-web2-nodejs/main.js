const http = require('http');
const fs = require('fs');
const url = require('url');

const templateHTML = (title, list, body) => {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}    
  </body>
  </html>
  `;
};

const templateList = (files) => {
  let list = '<ul>';
  let i = 0;
  while(i < files.length) {
    list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
    i = i + 1;
  }
  list += '</ul>';
  return list;
};

const app = http.createServer(function (request, response) {
  let _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;

  if (pathname === '/') {
    if (queryData.id === undefined) {
      const title = 'Welcome';
      const description = 'Welcome, Node.js';
      fs.readdir('./data', (err, files) => {
        const list = templateList(files);
        const template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, 'utf-8', (err, description) => {
        fs.readdir('./data', (err, files) => {
          const title = queryData.id;
          const list = templateList(files);
          const template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end('Not found');
  }

});
app.listen(3000);