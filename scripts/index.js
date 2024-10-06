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

function openPopup(target) {
  target.classList.add("modal_opened");
}

function closePopup(target) {
  target.classList.remove("modal_opened");
}

const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", function () {
    closePopup(modal);
  });
});

function showInputError(form, inputElement, errorMessage) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("modal__text-input_error");
  errorElement.textContent = errorMessage;
}

function hideInputError(form, inputElement) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("modal__text-input_error");
  errorElement.textContent = "";
}

function checkInputValidity(form, formElement) {
  if (!formElement.validity.valid) {
    showInputError(form, formElement, formElement.validationMessage);
  } else {
    hideInputError(form, formElement);
  }
}

function closePopupByEscape(modal) {
  document.addEventListener("keyup", function (evt) {
    if (evt.key === "Escape") {
      closePopup(modal);
    }
  });
}

function closePopupByClickingOutside(modal) {
  modal.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
  });
}

function setEventListeners(form) {
  const modal = form.closest(".modal");
  closePopupByEscape(modal);
  closePopupByClickingOutside(modal);
  const inputList = Array.from(form.querySelectorAll(".modal__text-input"));
  const buttonElement = form.querySelector(".modal__submit");
  if (buttonElement !== null) {
    toggleButtonState(inputList, buttonElement);
  }
  if (inputList !== null) {
    addingValidation(inputList, buttonElement);
  }
}

function addingValidation(inputList, buttonElement) {
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__submit_inactive");
  } else {
    buttonElement.classList.remove("modal__submit_inactive");
  }
}

//Cards rendering
const cardList = document.querySelector(".cards");
const cardTemplate = cardList.querySelector("#card").content;

function getCardElement(data) {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__pic");
  const cardTitle = cardItem.querySelector(".card__title");
  cardImage.addEventListener("click", function () {
    openPopup(bigPictureModal);
    pictureModal.src = cardImage.src;
    pictureModal.alt = cardTitle.textContent;
    pictureTitleModal.textContent = cardItem.textContent;
    setEventListeners(bigPictureModal);
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
  openPopup(nameChangeModal);
  userNameModal.value = userName.textContent;
  userStatusModal.value = userStatus.textContent;
  setEventListeners(nameChangeModalForm);
});

nameChangeModal.addEventListener("submit", function (event) {
  event.preventDefault();
  closePopup(nameChangeModal);
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
  openPopup(addCardModal);
  setEventListeners(addCardModalForm);
});

addCardModal.addEventListener("submit", function (event) {
  event.preventDefault();
  closePopup(addCardModal);
  const newCard = { name: titleModal.value, link: imageModal.value };
  const cardItem = getCardElement(newCard);
  cardList.prepend(cardItem);
  event.target.reset();
});

//Picture modal
const bigPictureModal = document.querySelector(".picture-modal");
const pictureModal = bigPictureModal.querySelector(".picture-modal__picture");
const pictureTitleModal = bigPictureModal.querySelector(
  ".picture-modal__title"
);
