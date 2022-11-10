const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// REST Countries URL
const url = "https://restcountries.com/v3.1/all";
var data;
async function displayData() {
  var response = await fetch(url);
  if(response.ok === false || response.body === ""){
    console.log(console.error());
    return;
  }
  console.log(response.ok);
  data = await response.json();
}

app.get("/", (req, res) => {
  // render pug template for the index.html file
  res.render("index", {
    heading: "Countries of the World",
    main: "Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world",
  });
});

app.get("/capitals", (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array
  //var data = displayData();
  let list = [];
  for (var i = 0; i < data.length; i++) {
    list[i] = data[i]["name"]["common"] + " - " + data[i]["capital"];
  }
  list.sort();

  res.render("page", {
    heading: "Countries and Capitals",
    results: list,
  });

  
});

app.get("/populous", (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population
  data.sort(function (a, b) {
    return b["population"] - a["population"];
  });
  let list = [];
  for (var i in data) {
    if (data[i]["population"] > 50000000)
      list.push(data[i]["name"]["common"] + " - " + data[i]["population"]);
  }
  res.render("page", {
    heading: "Most Populous Countries",
    results: list,
  });
});

app.get("/regions", (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  var dirc = new Object();
  for (var i in data) {
    var regions = data[i]["region"];
    if (dirc[regions]) {
      dirc[regions]++;
    } else {
      dirc[regions] = 1;
    }
  }
  list = [];
  for (var keys in dirc) {
    list.push(keys + " - " + dirc[keys]);
  }
  res.render("page", {
    heading: "Regions of the World",
    results: list,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  displayData();
});
