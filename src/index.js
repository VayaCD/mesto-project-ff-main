import './styles/index.css';
import { closeModal } from './components/modal'
import { openModal } from './components/modal';
import { createCard } from './components/card';
import { enableValidation, clearValidation } from './components/validation.js';
import { updateAvatar, updateUserInfo, getInitialCards, getUserInfo, addCard as apiAddCard } from './components/api.js';

let currentUserId;
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEditCard = document.querySelector(".popup_type_edit");
const addBtn = document.querySelector(".profile__add-button");
const profEditBtn = document.querySelector(".profile__edit-button");
const cardsList = document.querySelector(".places__list");
const formEditElement = popupEditCard.querySelector('.popup__form');
const formAddElement = popupNewCard.querySelector('.popup__form');
const popupImageCard = document.querySelector('.popup_type_image');
const imgName = popupNewCard.querySelector(".popup__input_type_card-name");
const imgLink = popupNewCard.querySelector(".popup__input_type_url");
const profTitle = document.querySelector(".profile__title");
const profDescr = document.querySelector(".profile__description");
const nameInput = popupEditCard.querySelector('.popup__input_type_name');
const jobInput = popupEditCard.querySelector('.popup__input_type_description');
const popupImg = popupImageCard.querySelector('.popup__image');
const popupCaption = popupImageCard.querySelector('.popup__caption');
const popupAll = document.querySelectorAll('.popup');
const profImage = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatarElement = popupAvatar.querySelector('.popup__form');
const avatarInput = popupAvatar.querySelector('.popup__input_type_avatar');



profImage.addEventListener("click", () => {
  clearValidation(formAddElement, validationConfig);
  openModal(popupAvatar);
})

addBtn.addEventListener("click", () => {
  formAddElement.reset();
  clearValidation(formAddElement, validationConfig);
  openModal(popupNewCard);
});

profEditBtn.addEventListener("click", () => {
  nameInput.value = profTitle.textContent;
  jobInput.value = profDescr.textContent;
  clearValidation(formEditElement, validationConfig);
  openModal(popupEditCard);
})

popupAll.forEach(popup => {
  popup.querySelector('.popup__close').addEventListener("click", () => {
    closeModal(popup);
  });
})

function renderCards(arrayOfCards, currentUserId) {
  cardsList.innerHTML = "";
  arrayOfCards.forEach((card) => {
    const cardElement = createCard(card, openImg, currentUserId);
    cardsList.append(cardElement);
  });
}

function openImg(link, name) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openModal(popupImageCard);
}


function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  updateAvatar(avatarInput.value)
    .then((user) => {
      profImage.style.backgroundImage = `url('${user.avatar}')`;
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      closeModal(popupAvatar);
    });
}

function handleRenameSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  updateUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      profTitle.textContent = user.name;
      profDescr.textContent = user.about;
      profImage.style.backgroundImage = `url('${user.avatar}')`;
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      closeModal(popupEditCard);
    });
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';
  if (imgName.value && imgLink.value) {
    apiAddCard(imgName.value, imgLink.value)
      .then((json) => {
        json.owner = { _id: currentUserId };
        const cardElement = createCard(json, openImg, currentUserId);
        cardsList.prepend(cardElement);
      })
      .finally(() => {
        submitButton.textContent = 'Сохранить';
        closeModal(popupNewCard);
      });
  }
}

formEditElement.addEventListener('submit', handleRenameSubmit)

formAddElement.addEventListener('submit', handleAddCardSubmit)

formAvatarElement.addEventListener('submit', handleAvatarSubmit)


Promise.all([
  getUserInfo(),
  getInitialCards()
])
  .then(([user, cards]) => {
    currentUserId = user._id;
    profTitle.textContent = user.name;
    profDescr.textContent = user.about;
    profImage.style.backgroundImage = `url('${user.avatar}')`;
    renderCards(cards, currentUserId);
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных:', err);
  });

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);
