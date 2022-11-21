const express = require("express");
const app = express();
const session = require("express-session");
const port = process.env.PORT || 5001;

// Add your code here
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  session({
    secret: "secretkey",
    cookie: { maxAge: oneDay },
  })
);

// Use the express-session module
app.get("*", function (req, res) {
  if (req.session.history) {
    req.session.history.push(`${req.url}`);
    let result = "";
    for (let i = 0; i < req.session.history.length; i++) {
      result += "<li>" + req.session.history[i] + "</li>";
    }
    res.send(
      "currently on route : " +
        ` ${req.url}` +
        "<br> previously visited : <br>" +
        `${result}`
    );
  } else {
    req.session.history = [];
    res.send(
      "currently on route : " +
        ` ${req.url}` +
        "<br>" +
        " Welcome to http://localhost:" +
        `${port}`
    );
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
