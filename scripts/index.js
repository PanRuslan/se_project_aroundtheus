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

const cardList = document.querySelector(".cards");
const cardTemplate = cardList.querySelector("#card").content;

function getCardElement(data) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__pic");
  cardImage.src = data.link;
  cardItem.querySelector(".card__title").textContent = data.name;
  cardImage.alt = data.name;
  return cardItem;
}

function renderCards(cardsList) {
  for (let card of cardsList) {
    const cardItem = getCardElement(card);
    cardList.append(cardItem);
  }
}

renderCards(initialCards);

const userName = document.querySelector(".user__name");
const userStatus = document.querySelector(".user__status");

const nameChangeModal = document.querySelector(".modal");
const modalForm = document.forms["modal__form"];
const userNameModal = modalForm["name"];
const userStatusModal = modalForm["about-me"];
const nameChanger = document.querySelector(".user__name-changer");
nameChanger.addEventListener("click", function () {
  nameChangeModal.classList.toggle("modal_opened");
  userNameModal.value = userName.textContent;
  userStatusModal.value = userStatus.textContent;
});

const nameChangeModalCloser = nameChangeModal.querySelector(".modal__close");

function closeModal() {
  nameChangeModal.classList.remove("modal_opened");
}

nameChangeModalCloser.addEventListener("click", closeModal);

nameChangeModal.addEventListener("submit", function (event) {
  event.preventDefault();
  closeModal();
  userName.textContent = userNameModal.value;
  userStatus.textContent = userStatusModal.value;
});
