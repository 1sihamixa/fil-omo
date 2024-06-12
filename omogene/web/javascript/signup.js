document.addEventListener("DOMContentLoaded", function () {
  var btnEnregistrer = document.querySelector(".btn-enregistrer");
  var btnConnexion = document.querySelector(".btn-connexion");
  var connexionSection = document.querySelector(".connexion");
  var enregistrerSection = document.querySelector(".enregistrer");

  btnEnregistrer.addEventListener("click", function () {
    connexionSection.classList.add("remove-section");
    enregistrerSection.classList.remove("active-section");
    btnEnregistrer.classList.remove("active");
    btnConnexion.classList.add("active");
  });

  btnConnexion.addEventListener("click", function () {
    connexionSection.classList.remove("remove-section");
    enregistrerSection.classList.add("active-section");
    btnEnregistrer.classList.add("active");
    btnConnexion.classList.remove("active");
  });
});

let signSubmit = document.getElementById("signSubmit");

signSubmit.addEventListener("click", function () {
  let signUsername = document.getElementById("signUsername").value;
  let signEmail = document.getElementById("signEmail").value;
  let signPassword = document.getElementById("signPassword").value;
  let signConfirmPassword = document.getElementById(
    "signConfirmPassword"
  ).value;

  let request = new XMLHttpRequest();
  request.open("POST", "signup.php", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(
    "username=" +
      signUsername +
      "&email=" +
      signEmail +
      "&password=" +
      signPassword +
      "&cpassword=" +
      signConfirmPassword
  );
  request.onload = function () {
    let response = request.response;
    console.log(response);
  };
});
