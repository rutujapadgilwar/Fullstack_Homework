const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req,res){
  res.sendFile('./03-form.html');
});
// POST request
app.post('/submit', (req, res) => {
  // Add your code here
  res.writeHead(200, {'Content-Type': 'text/html' });
  res.write("Name: "+ req.body['Name']);
  res.write(`<br>`+ "Email: "+ req.body['Email']);
  let comments = req.body['Comments'];
        comments = comments === "" ? "n/a" : comments;
        res.write(`<br>` +"Comments: " + comments + `<br/>`);

  let newsletter = req.body['Newsletter'] === undefined ? "" : "on";
  newsletter =
    newsletter === ""
      ? "No, thank you!" 
      : "Yes, Sign me up for the newsletter.";
  res.write("Newsletter: " + newsletter);
  res.end();
  


});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
