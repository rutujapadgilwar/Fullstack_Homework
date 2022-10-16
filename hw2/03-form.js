/** Exercise 03 - Form **/

// Add your code here
let validText = document.getElementById("validName");
let validEmail = document.getElementById("validEmail");
function validateForm() {
  var formatName = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0123456789]/;
  var formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let fieldName = document.forms["form1"]["name"].value;
  let fieldEmail = document.forms["form1"]["email"].value;

  let validBool = true;

  if (fieldName === "" || fieldName.match(formatName)) {
    console.log("Invalid Name");
    validText.innerHTML = "Please enter a valid Name";
    validBool = false;
  } else {
    validText.innerHTML = "";
  }

  if (fieldEmail === "" || !fieldEmail.match(formatEmail)) {
    console.log("Invalid Email");
    validEmail.innerHTML = "Please enter a valid Email";
    validBool = false;
  } else {
    validEmail.innerHTML = "";
  }

  return validBool;
}

function resetForm() {
  validText.innerHTML = "";
  validEmail.innerHTML = "";
  document.getElementById("form1").reset();
}
function submitForm() {
  if (!validateForm()) {
    return;
  }
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  console.log("========Form Submission======");
  console.log("Name: " + name);
  console.log("Email: " + email);
  if (message.length === 0) {
    console.log("Feedback: No feedback was submitted.");
  } else {
    console.log("Feedback: " + message);
  }
  var checkbox = document.getElementById("checkbox");
  var newsletter = checkbox.checked;

  if (newsletter === true) {
    console.log("Newsletter: Yes, I would like to join the newsletter.");
  } else {
    console.log("Newsletter: No, thank you.");
  }
}
