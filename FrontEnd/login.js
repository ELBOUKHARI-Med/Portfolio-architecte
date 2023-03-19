// Référencer les éléments HTML nécessaires
const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

// Ajouter un gestionnaire d'événement pour gérer la soumission du formulaire
form.addEventListener("submit", (event) => {
  // Empêcher la soumission du formulaire par défaut
  event.preventDefault();
  
  // Récupérer les données entrées par l'utilisateur
  const email = emailInput.value;
  const password = passwordInput.value;
  console.log(email);
  // Préparer les données pour être envoyées au serveur
  const data = {
    email,
    password,
  };

  // Envoyer les données au serveur avec une requête POST
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // Vérifier que la réponse est en 200 OK
      if (!response.ok) {
        throw new Error("Connexion échouée");
      }
      // Récupérer les données renvoyées par le serveur
      return response.json();
    })
    .then((data) => {
      // Stocker le token renvoyé par le serveur
      localStorage.setItem("token", data.token);
      
      // Rediriger l'utilisateur sur la page index
      window.location.href = "index.html";
    })
    .catch((error) => {
      // Afficher un message d'erreur si la connexion échoue
      console.error(error);
      alert("Erreur dans l’identifiant ou le mot de passe.");
    });
});
