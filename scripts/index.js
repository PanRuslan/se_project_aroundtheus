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

function getCardElement(data) {
  const cardList = document.querySelector(".cards");
  const cardTemplate = cardList.querySelector("#card").content;
  for (let card of data) {
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    cardItem.querySelector(".card__pic").src = card.link;
    cardItem.querySelector(".card__pic").alt = card.name;
    cardItem.querySelector(".card__title").textContent = card.name;
    cardList.append(cardItem);
  }
}

getCardElement(initialCards);

const userName = document.querySelector(".user__name");
const userStatus = document.querySelector(".user__status");

const nameChangeModal = document.querySelector(".modal");
const userFieldsModal = nameChangeModal.querySelectorAll(".modal__text-input");
const nameChanger = document.querySelector(".user__name-changer");
nameChanger.addEventListener("click", function () {
  nameChangeModal.classList.toggle("modal_opened");
  userFieldsModal[0].value = userName.textContent;
  userFieldsModal[1].value = userStatus.textContent;
});

const nameChangeModalCloser = nameChangeModal.querySelector(".modal__close");
nameChangeModalCloser.addEventListener("click", function () {
  nameChangeModal.classList.remove("modal_opened");
});

const modalSubmitButton = nameChangeModal.querySelector(".modal__submit");
modalSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  nameChangeModal.classList.remove("modal_opened");
  userName.textContent = userFieldsModal[0].value;
  userStatus.textContent = userFieldsModal[1].value;
});
