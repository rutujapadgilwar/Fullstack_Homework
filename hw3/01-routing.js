const http = require("http");
const port = process.env.PORT || 5001;
const NodeCache = require("node-cache");

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    "welcome",
    "redirect",
    "redirected",
    "cache",
    "cookie",
    "check-cookies",
    "other",
  ];

  let getRoutes = () => {
    let result = "";

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };
  if (req.url === "/") {
    let routeResults = getRoutes();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  }
  switch (req.url) {
    case "/welcome":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1>welcome</h1>");
      res.end();
      break;
    case "/redirect":
      res.writeHead(302, {
        location: "/redirected",
      });
      res.end();
      break;
    case "/redirected":
      res.write("<h1>In redirected</h1>");
      res.end();
      break;
    case "/cache":
      const myCache = new NodeCache();
      myCache.set("Cache", "Cache generated", 86400);
      res.write("<h1>this resource was catched </h1>");
      res.end();
      break;
    case "/cookie":
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Set-Cookie": "hello=world",
      });
      res.write("cookies... yum");
      res.end();
      break;
    case "/check-cookies":
      let cookieCheck = req.headers.cookie;
      console.log(cookieCheck);
      let response = cookieCheck === undefined ? "No" : "Yes";
      if (response === "Yes" && cookieCheck.includes("hello=")) {
        res.write("<h1>" + `${response}` + "</h1>");
      } else {
        res.write("<h1> No </h1>");
      }
      res.end();
     default:
      res.statusCode = 404;
      res.setHeader = '"Content-Type": "text/html"' 
      res.end("<h1>404 - page not found</h1>");    
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
