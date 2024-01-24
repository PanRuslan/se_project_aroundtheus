const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Cards rendering
const cardList = document.querySelector(".cards");
const cardTemplate = cardList.querySelector("#card").content;

function getCardElement(data) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__pic");
  const cardTitle = cardItem.querySelector(".card__title");
  cardImage.addEventListener("click", function () {
    bigPictureModal.classList.toggle("modal_opened");
    pictureModal.src = cardImage.src;
    pictureModal.alt = cardTitle.textContent;
    pictureTitleModal.textContent = cardItem.textContent;
  });
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button--liked");
  });
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    cardItem.remove();
  });
  cardImage.src = data.link;
  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  return cardItem;
}

function renderCards(cardsList) {
  cardsList.forEach((card) => {
    const cardItem = getCardElement(card);
    cardList.append(cardItem);
  });
}

renderCards(initialCards);

//Name changing
const userName = document.querySelector(".user__name");
const userStatus = document.querySelector(".user__status");

const nameChangeModal = document.querySelector(".name");
const nameChangeModalForm = document.forms["name__form"];
const userNameModal = nameChangeModalForm["name"];
const userStatusModal = nameChangeModalForm["about-me"];
const nameChanger = document.querySelector(".user__name-changer");
nameChanger.addEventListener("click", function () {
  nameChangeModal.classList.toggle("modal_opened");
  userNameModal.value = userName.textContent;
  userStatusModal.value = userStatus.textContent;
});

const nameChangeModalCloser = nameChangeModal.querySelector(".modal__close");

function closeNameChangeModal() {
  nameChangeModal.classList.remove("modal_opened");
}

nameChangeModalCloser.addEventListener("click", closeNameChangeModal);

nameChangeModal.addEventListener("submit", function (event) {
  event.preventDefault();
  closeNameChangeModal();
  userName.textContent = userNameModal.value;
  userStatus.textContent = userStatusModal.value;
});

//Adding new card
const addCardModal = document.querySelector(".new-card");
const addCardModalForm = document.forms["new-card__form"];
const titleModal = addCardModalForm["title"];
const imageModal = addCardModalForm["image-link"];
const imageAdder = document.querySelector(".user__add-picture");
imageAdder.addEventListener("click", function () {
  addCardModal.classList.toggle("modal_opened");
});

const addCardModalCloser = addCardModal.querySelector(".modal__close");

function closeAddCardModal() {
  addCardModal.classList.remove("modal_opened");
}

addCardModalCloser.addEventListener("click", closeAddCardModal);

addCardModal.addEventListener("submit", function (event) {
  event.preventDefault();
  closeAddCardModal();
  let newCard = { name: titleModal.value, link: imageModal.value };
  const cardItem = getCardElement(newCard);
  cardList.prepend(cardItem);
  titleModal.value = "";
  imageModal.value = "";
});

//Picture modal
const bigPictureModal = document.querySelector(".picture-modal");
const pictureModal = bigPictureModal.querySelector(".picture-modal__picture");
const pictureTitleModal = bigPictureModal.querySelector(
  ".picture-modal__title"
);
const bigPictureModalCloser = bigPictureModal.querySelector(".modal__close");

function closebigPictureModal() {
  bigPictureModal.classList.remove("modal_opened");
}

bigPictureModalCloser.addEventListener("click", closebigPictureModal);
