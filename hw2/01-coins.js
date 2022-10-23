/** Exercise 01 - Coins **/

const calculateChange = (input) => {
  var amount = input;
  const dollar = 100;
  const quarter = 25;
  const dime = 10;
  const nickel = 5;
  const penny = 1;
  let answer = "$" + amount + " ==> ";
  if (amount > 10) {
    console.log(answer + "Error: the number is too large ");
    process.exit();
  }

  amount *= 100;
  //console.log(amount)
  const dollarD = Math.floor(amount / dollar);
  if (Math.floor(amount / dollar) > 1) {
    answer += dollarD + " dollars, ";
  } else if (Math.floor(amount / dollar) == 1) {
    answer += dollarD + " dollar, ";
  }
  amount %= dollar;
  //console.log(answer);

  const quarterD = Math.floor(amount / quarter);
  if (quarterD > 1) {
    answer += quarterD + " quarters, ";
  } else if (quarterD == 1) {
    answer += quarterD + " quarter, ";
  }

  amount %= quarter;
  //console.log(answer);

  const dimeD = Math.floor(amount / dime);
  if (dimeD > 1) {
    answer += dimeD  + " dimes, ";
  } else if (dimeD  == 1) {
    answer += dimeD + " dime, ";
  }
  amount %= dime;
  //console.log(answer);
  
  const nickelD = Math.floor(amount / nickel);
  if ( nickelD  > 1) {
    answer +=  nickelD   + " nickels, ";
  } else if ( nickelD   == 1) {
    answer +=  nickelD  + " nickel, ";
  }
  amount %= nickel;
  //console.log(answer);

  const pennyD = Math.floor(amount / penny);
  if (pennyD > 1) {
    answer +=  pennyD   + " pennies, ";
  } else if ( pennyD   == 1) {
    answer +=  pennyD  + " penny, ";
  }
  amount %= penny;
  //Slicing by 2 because we have an extra comma and a space
  console.log(answer.slice(0, -2));
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
