
function displayModal() {
  const ModalContainer = document.getElementById('modal-container');
  ModalContainer.style.display = 'block';


}
const modalBtn2 = document.querySelector('#btn-modal2');
modalBtn2.addEventListener('click', displayModal);

// close modal1

const closeModalButton = document.querySelector('.close-modal');
const modal = document.querySelector('.modal-container');
const overlay = document.querySelector('.overlay-modal');



function closeModal() {
  console.log('closeModal()');
  modal.style.display = 'none';

}

function outsideClick(event) {
  console.log('outsideClick()');
  if (event.target === overlay) {
    closeModal();
  }
}




closeModalButton.addEventListener('click', closeModal);
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

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
console.log('openModalAdd');
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




const publishButton = document.querySelector('#publish');

publishButton.addEventListener('click', handleAddProject);



const form = document.querySelector('form');
const formData = new FormData();
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('input[type="text"]');
  const inputTitle = input.value.trim();
  const inputCategory = document.querySelector('#photo-category');
  const inputFile = document.querySelector('#photo');
  if (!inputTitle || !inputCategory) {
    alert('Veuillez remplir tous les champs du formulaire.');
  } else {
    
    formData.append('image', inputFile.files[0]);
    formData.append('title', inputTitle);
    console.log(inputCategory);
    formData.append('category', getIdFromName(inputCategory.value));
   
    console.log(formData);
    
  window.addProject (formData.get('category'), URL.createObjectURL(formData.get('image')), Math.random(), formData.get('title'));
  closeModalAdd ();

  }
});

function handleAddProject() {
  if (formData.get('image')!=null) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    };
    console.log(formData);
    // Envoi des données du formulaire à l'API avec fetch()

    fetch(`http://localhost:5678/api/works`, requestOptions)

      .then(response => {
        if (response.ok) {
          alert('Votre projet a été publié avec succès.');
          // Actualiser la galerie de projets
          window.location.reload();
        } else {
          alert('Une erreur est survenue lors de l\'envoi du formulaire.');

        }
      })

      .catch(error => { console.log(response); alert(error.message) });
  }
}
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

function getIdFromName(name) {
  for (let i = 0; i < typesBiens.length; i++) {
    if (typesBiens[i].name === name) {
      return typesBiens[i].id;
    }
  }
  return null; // si aucun ID n'a été trouvé
}




