/** Exercise 04 - API **/

const url = "https://restcountries.com/v3.1/all";
async function displayData() {
  var response = await fetch(url);
  console.log(response.ok);
  if(response.ok === false || response.body === ""){
    document.getElementById("results").innerHTML = "Oops! It seems that the external url is not working."
    return;
  }
  var data = await response.json();
  var list = [];
  for (var i = 0; i < data.length; i++) {
    list[i] =
      data[i]["name"]["common"] +
      "-" +
      data[i]["population"] +
      "</li>";
  }
  
  list.sort();
  
  var result = '';
  for(var i in list){
    result += ("<li>" +
    list[i] +
    "</li>")
  }
  console.log(list);
  document.getElementById("results").innerHTML = result;
}

