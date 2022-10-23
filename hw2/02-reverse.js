/** Exercise 02 - Reverse **/

// Add your code here
function reverseNumber() {
    console.log("Inside reverseNumber");
  let number = document.getElementById("input").value;
  let ans = document.getElementById("ans");
  const num1 = number;
  let reverse = 0;
  findlength = number.toString().length;
  if (findlength !== 8) {
    ans.style = "color:Red";
    ans.innerHTML = "Error: Please input an 8-digit number";
    return;

  }
  while (number !== 0) 
  {
    rem = number % 10;
    reverse = reverse * 10 + rem;
    number = Math.floor(number / 10);
    
  }
  console.log(num1 + "-->" + reverse);
  ans.style = "color:Green";
  ans.innerHTML = num1 + " --> " + reverse;
}
