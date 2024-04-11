document.getElementById("password").addEventListener("change", function () {
  var password = this.value;
  var requirementsDiv = document.getElementById("password-requirements");

  if (
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{12,}$/.test(
      password
    )
  ) {
    requirementsDiv.style.display = "none";
  } else {
    requirementsDiv.style.display = "block";
  }
});
