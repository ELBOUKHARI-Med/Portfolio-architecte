// Cette fonction affiche la modal en changeant la propriété display de la div qui la contient en "block"
function displayModal() {
  const ModalContainer = document.getElementById('modal-container');
  ModalContainer.style.display = 'block';
}

// On sélectionne le bouton qui ouvre la modal et on lui ajoute un écouteur d'événements qui va appeler la fonction displayModal()
const modalBtn2 = document.querySelector('#btn-modal2');
modalBtn2.addEventListener('click', displayModal);


// On sélectionne les éléments qui servent à fermer la modal
const closeModalButton = document.querySelector('.close-modal');
const modal = document.querySelector('.modal-container');
const overlay = document.querySelector('.overlay-modal');


// Cette fonction ferme la modal en changeant la propriété display de la div qui la contient en "none"
function closeModal() {

  modal.style.display = 'none';
}

// Cette fonction est appelée lorsqu'on clique à l'extérieur de la modal. Si l'élément cliqué est l'overlay, on ferme la modal
function outsideClick(event) {

  if (event.target === overlay) {
    closeModal();
  }
}


// Ajout d'un écouteur d'événement au bouton de fermeture
closeModalButton.addEventListener('click', closeModal);
// Ajout d'un écouteur d'événement pour la touche "Escape" pour fermer la modale
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
// Ajout d'un écouteur d'événement pour cliquer en dehors de la modale pour la fermer
window.addEventListener('click', outsideClick);
overlay.addEventListener('click', outsideClick);


// Récupération des éléments nécessaires
const closeButton = document.querySelector('.fa-xmark');
const returnBtn = document.querySelector('.fa-arrow-left');
const openButton = document.querySelector('.btn-add-photo');
const validationBtn = document.querySelector('#validationBtn');
// Fonction pour ouvrir la modale
function openModalAdd() {
  const modalAjout = document.querySelector('.modale');
  modalAjout.style.display = 'block';
  const elementsACacher = [

    document.getElementById('modal-container'),

  ];
  cacherElements(elementsACacher);

}

// Fonction pour fermer la modale
function closeModalAdd() {
  const modalAjout = document.querySelector('.modale');
  modalAjout.style.display = 'none';
  const elementsACacher = [

    document.getElementById('modal-container'),

  ];
  cacherElements(elementsACacher);
}

function modalReturn() {
  const modalAjout = document.querySelector('.modale');
  modalAjout.style.display = 'none';
  modal.style.display = 'block';
}
// Gestionnaire d'événement pour ouvrir la modale
openButton.addEventListener('click', openModalAdd);


returnBtn.addEventListener('click', modalReturn);


// Gestionnaire d'événement pour fermer la modale
closeButton.addEventListener('click', closeModalAdd);

// Gestionnaire d'événement pour fermer la modale en cliquant en dehors de celle-ci
window.addEventListener('click', (event) => {
  const modalAjout = document.querySelector('.modale');
  if (event.target === modalAjout) {
    closeModalAdd();
  }
});

// Gestionnaire d'événement pour fermer la modale avec la touche ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModalAdd();
  }
});


// Sélectionner le bouton "Ajouter une photo"
const inputPhoto = document.querySelector('#photo');
// Sélectionner l'image dans la modale
const modalImage = document.querySelector('#modal-image');
// Ajouter un écouteur d'événements sur le bouton "Ajouter une photo"
inputPhoto.addEventListener('change', (event) => {
  // Récupérer le fichier sélectionné
  const file = event.target.files[0];

  // Vérifier que le fichier est une image
  if (file.type.startsWith('image/')) {
    // Créer un objet URL pour l'image
    const imageUrl = URL.createObjectURL(file);

    // Afficher l'image dans la modale
    modalImage.src = imageUrl;

    // Afficher la modale
    modal.style.display = 'block';
  }
});


// On récupère les éléments du DOM nécessaires
const uploadBtn = document.getElementById('upload-btn');
const photoInput = document.getElementById('photo');
const image = document.getElementById('modal-image');
let addImageSrc;
// On ajoute un écouteur d'événement sur le changement de l'input de type "file"
photoInput.addEventListener('change', () => {
  // On récupère le fichier sélectionné dans l'input de type "file"
  const file = photoInput.files[0];

  // On crée un objet "FileReader" pour lire le fichier sélectionné
  const reader = new FileReader();

  // On ajoute un écouteur d'événement sur le chargement du fichier
  reader.addEventListener('load', () => {
    // Ce chargement va mettre à jour l'attribut "src" de l'image avec l'URL du fichier lu
    image.src = reader.result;
    addImageSrc = image.src;
  });

  // Si un fichier est sélectionné
  if (file) {
    // On lit le fichier avec l'objet "FileReader"
    reader.readAsDataURL(file);

    // On masque le bouton "+Ajouter une photo", l'input de type "file" et la div contenant les détails de l'image
    uploadBtn.style.display = 'none';
    photoInput.style.display = 'none';
    document.querySelector('.image-details').style.display = 'none';
  }
});



// Sélectionne le bouton de publication
const publishButton = document.querySelector('#publish');
// Ajoute un événement de clic sur le bouton de publication qui appelle la fonction handleAddProject
publishButton.addEventListener('click', handleAddProject);


// Sélectionne le formulaire
const form = document.querySelector('form');
// Crée un nouvel objet FormData pour stocker les données du formulaire
const formData = new FormData();
// Ajoute un événement de soumission sur le formulaire
form.addEventListener('submit', (e) => {
  e.preventDefault();// Empêche la soumission par défaut du formulaire
  // Sélectionne l'input de type texte et récupère sa valeur
  const input = document.querySelector('input[type="text"]');
  const inputTitle = input.value.trim();
  // Sélectionne le champ de catégorie de la photo et le champ de fichier photo et récupère leur valeur
  const inputCategory = document.querySelector('#photo-category');
  const inputFile = document.querySelector('#photo');
  // Vérifie que tous les champs obligatoires ont été remplis
  if (!inputTitle || !inputCategory) {
    alert('Veuillez remplir tous les champs du formulaire.');
  } else {
    // Si tous les champs ont été remplis, ajoute les données à l'objet FormData
    formData.append('image', inputFile.files[0]);
    formData.append('title', inputTitle);

    formData.append('category', getIdFromName(inputCategory.value));


    // Appelle la fonction addProject en passant les données du formulaire en paramètres
    window.addProject(formData.get('category'), URL.createObjectURL(formData.get('image')), Math.random(), formData.get('title'));
    // Ferme la boîte de dialogue pour ajouter un projet
    closeModalAdd();
  }
});

// Fonction pour gérer l'ajout d'un projet
function handleAddProject() {
  // Vérifie que le champ de fichier photo a été rempli
  if (formData.get('image') != null) {
    // Crée un objet requestOptions pour configurer la requête fetch()
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    };

    // Envoi des données du formulaire à l'API avec fetch()
    fetch(`http://localhost:5678/api/works`, requestOptions)

      .then(response => {
        if (response.ok) {
          // Affiche une alerte si l'envoi a réussi et actualise la galerie de projets
          alert('Votre projet a été publié avec succès.');
          // Actualiser la galerie de projets
          window.location.reload();
        } else {
          // Affiche une alerte si une erreur est survenue lors de l'envoi du formulaire
          alert('Une erreur est survenue lors de l\'envoi du formulaire.');

        }
      })

      .catch(error => { console.log(response); alert(error.message) });
  }
}
// Tableau d'objets contenant les types de projets
const typesBiens = [
  {
    "id": 1,
    "name": "Objets"
  },
  {
    "id": 2,
    "name": "Appartements"
  },
  {
    "id": 3,
    "name": "Hotels & restaurants"
  }
];
// Fonction pour récupérer l'ID d'un type de bien immobilier à partir de son nom
function getIdFromName(name) {
  for (let i = 0; i < typesBiens.length; i++) {
    if (typesBiens[i].name === name) {
      return typesBiens[i].id;
    }
  }
  return null; // si aucun ID n'a été trouvé
}




