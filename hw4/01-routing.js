const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// http://localhost:5000/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5000/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5000/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5000/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5000/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = [
  'welcome',
  'redirect',
  'redirected',
  'cache',
  'cookie',
  'other',
];

let getRoutes = () => {
  let result = '';

  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );

  return result;
};

app.get('/', (req, res) => {
  let routeResults = getRoutes();
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Exercise 04</h1>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get('/welcome', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html' });
  res.write("<h1>Welecom</h1>");
  res.end();
});

app.get("/redirect", (req,res) =>{
  res.writeHead(302, {
  location: "/redirected",
  });
  res.end();
});
app.get("/redirected", (req,res) => { 
  res.write("<h1>In redirected</h1>");
  res.end();
});
app.get("/cache", (req,res) => {
  res.set("Cache-Control", 86400);
  res.write("<h1>this resource was catched </h1>");
  res.end();
});
app.get("/cookie", (req,res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Set-Cookie": "hello=world",
  });
  res.write("cookies... yum");
  res.end();
});

app.get("/*", (req,res) => {
  res.writeHead(404, {'Content-Type': 'text/html' });
  res.write("<h1>404- Page Not Found</h1>");
  res.end();
});

// Add your code here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
