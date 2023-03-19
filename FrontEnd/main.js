

// Fonction pour cacher les éléments
function cacherElements(elementsACacher) {


  elementsACacher.forEach(element => {
    if (element) {
      element.style.display = 'none';
    }
  });
}

// Vérification du token
const token = localStorage.getItem('token');
if (!token) {
  console.error('Token non trouvé');
  const elementsACacher = [
    document.getElementById('edit-mode-bar-1'),
    document.getElementById('logout-btn'),
    document.getElementById('btn-modal0'),
    document.getElementById('btn-modal1'),
    document.getElementById('btn-modal2'),
    document.getElementById('modal-container'),
    document.getElementById('modal2'),
  ];
  cacherElements(elementsACacher);
} else {
  const elementsACacher = [
    document.getElementById('filtres'),
    document.getElementById('login-btn').closest('li'), ,
    document.getElementById('modal-container'),
    document.getElementById('modal2'),

  ];

  cacherElements(elementsACacher);
  console.log(token);
}

// Fonction pour gérer le bouton "logout"
function handleLogout() {
  // Supprimer l'élément "token" du LocalStorage
  localStorage.removeItem('token');
}



// Ajouter un écouteur d'événement "click" au bouton "logout"
const logoutButton = document.querySelector('#logout-btn');
logoutButton.addEventListener('click', handleLogout);






// Appel à l'API pour récupérer les projets de l'architecte	
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(projects => {

    // Création de la Map
    const imageIdMap = new Map();

    // Récupération de la galerie
    const gallery = document.querySelector('.gallery');
    // Suppression du contenu HTML existant
    gallery.innerHTML = '';

    // Ajout des travaux à la galerie
    projects.forEach(project => {
      const figure = document.createElement('figure');
      figure.setAttribute("data-filter", project.category.name);
      const img = document.createElement('img');
      img.setAttribute('id', 'image-modal')
      const figcaption = document.createElement('figcaption');

      // Ajout de la clé-valeur à la Map
      imageIdMap.set(project.imageUrl, project.id);


      img.src = project.imageUrl;

      img.alt = project.title;
      figcaption.textContent = project.title;


      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);


    });

    window.addProject = function (categoryname, imageUrl, id, title){
      const figure = document.createElement('figure');
          figure.setAttribute("data-filter", categoryname);
          const img = document.createElement('img');
          img.setAttribute('id', 'image-modal')
          const figcaption = document.createElement('figcaption');
    
          // Ajout de la clé-valeur à la Map
          imageIdMap.set(imageUrl, id);
    
    
          img.src = imageUrl;
    
          img.alt = title;
          figcaption.textContent = title;
    
    
          figure.appendChild(img);
          figure.appendChild(figcaption);
          gallery.appendChild(figure);
    }



    // Récupération de la galerie-modal
    const galleryModal = document.querySelector('.gallery-modal');
    const deletedProjects = [];
    // Suppression du contenu HTML existant
    galleryModal.innerHTML = '';

    // Ajout des travaux à la galerie-modal
    projects.forEach(project => {
      const figure = document.createElement('figure');
      figure.classList.add('gallery-figure'); // Ajoute une classe à l'élément figure
      const img = document.createElement('img');
      img.setAttribute('id', 'image-modal')
      const figcaption = document.createElement('figcaption');

      img.src = project.imageUrl;

      img.alt = project.title;
      figcaption.textContent = 'éditer';

      // crée un nouvel élément <i>
      let icone = document.createElement("i");

      // ajoute les classes "fa-light" et "fa-trash-can" à l'élément <i>
      icone.classList.add("fa-solid", "fa-trash-can");
      //<i class="fa-solid fa-trash-can"></i>

      // ajoute un gestionnaire d'événements à l'élément <i>
      icone.addEventListener("click", function () {

        // récupère l'élément parent de l'icône, qui est le <figure>
        let figure = this.parentNode;
        let image = figure.querySelector('#image-modal');
        let sourceImage = image.src;

        // supprime l'élément <figure>
        figure.parentNode.removeChild(figure);
        const gallery = document.querySelector('.gallery');
        const images = document.querySelectorAll('.gallery img');

        images.forEach(image => {
          if (image.src === sourceImage) {
            let figure = image.parentNode;
            figure.parentNode.removeChild(figure);
            // ajoute l'ID du projet à la liste deletedProjects
            deletedProjects.push(imageIdMap.get(sourceImage));
          }
        });
      });


      // Ajouter un écouteur d'événement "click" au bouton "publish"
      const publishButton = document.querySelector('#publish');

      publishButton.addEventListener('click', handlePublish);

      function handlePublish() {
        // Boucle sur la liste des identifiants de projets à supprimer et appelle la fonction deleteProject pour chaque projet
        deletedProjects.forEach(id => deleteProject(id));

      }



      // Fonction pour supprimer un projet en utilisant son identifiant
      function deleteProject(id) {
        // Envoie une requête de suppression au back-end pour supprimer le projet
        fetch(`http://localhost:5678/api/works/${id}`, {
          method: 'DELETE', headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(response => {
            if (response.ok) {
              closeModal();
              // Le projet a été supprimé avec succès
              console.log(`Le projet ${id} a été supprimé.`);
              deletedProjects = null;
            } else {
              // Une erreur s'est produite lors de la suppression du projet
              console.error(`Erreur lors de la suppression du projet ${id}.`);
            }
          })
          .catch(error => {
            // Une erreur s'est produite lors de l'envoi de la requête
            console.error(`Erreur lors de la suppression du projet ${id}: ${error.message}`);
          });
      }

      figure.appendChild(icone);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      galleryModal.appendChild(figure);


    });











    // Définir les catégories
const categories = ['Tous', 'Objets', 'Appartements', 'Hotels & restaurants'];

// Sélectionner l'élément parent pour les boutons
const filtersContainer = document.getElementById('filtres');

// Créer un bouton pour chaque catégorie
categories.forEach(category => {
  const button = document.createElement('button');
  button.textContent = category;
  filtersContainer.appendChild(button);
});

// Sélectionner toutes les figures dans la classe "gallery"
const figures = document.querySelectorAll('.gallery figure');

// Ajouter un écouteur d'événement "click" à chaque bouton
filtersContainer.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    const filter = event.target.textContent;
    // Ajouter la classe "selected" au bouton cliqué
    filtersContainer.querySelectorAll('button').forEach(button => {
      button.classList.remove('selected');
    });
    event.target.classList.add('selected');

    // Boucle à travers chaque figure
    figures.forEach(figure => {
      // Récupère la valeur de l'attribut "data-filter" de l'image dans la figure
      const figureFilter = figure.getAttribute('data-filter');

      // Vérifie si le filtre actuel est "Tous"
      if (filter === 'Tous') {
        // Si c'est le cas, affiche toutes les figures
        figure.style.display = 'block';
      } else if (figureFilter !== filter) {
        // Sinon, si le filtre de la figure ne correspond pas au filtre actuel, cache la figure
        figure.style.display = 'none';
      } else {
        // Sinon, affiche la figure
        figure.style.display = 'block';
      }
    });
  }
});

// Ajouter la classe "selected" au bouton "Tous" par défaut
filtersContainer.querySelector('button:first-child').classList.add('selected');

  });














