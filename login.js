document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get entered username and password
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Hardcoded username and password for validation
  var validUsername = "youssef";
  var validPassword = "youssef";

  // Check if entered credentials match the valid ones
  if (username === validUsername && password === validPassword) {
    // Redirect to the welcome page or perform any desired action
    window.location.replace("login.html");
  
  } else {
    // Display an error message or perform any desired action
    alert("Invalid username or password");
  }
});


/* function goToPage1() {
  document.getElementById("page0").style.display = "none";
  document.getElementById("page1").style.display = "block";
  addTable();
} */
