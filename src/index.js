import './styles/index.css';
import { initialCards as cardsArray } from './scripts/cards';
import { closeModal } from './components/modal'
import { openModal } from './components/modal';
import { createCard } from './components/card';
import { like } from './components/card';

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



addBtn.addEventListener("click", () => {
  openModal(popupNewCard);
});

profEditBtn.addEventListener("click", () => {
  nameInput.value = profTitle.textContent;
  jobInput.value = profDescr.textContent;
  openModal(popupEditCard);
})

popupAll.forEach(popup => {
  popup.querySelector('.popup__close').addEventListener("click", () => {
    closeModal(popup);
  });
})

function renderCards() {
  cardsList.innerHTML = "";
  cardsArray.forEach((card) => {
    const cardElement = createCard(card, like, openImg);
    cardsList.append(cardElement);
  });
}

export function addCard(name, link) {
  const cardElement = createCard({ name, link }, like, openImg);
  cardsList.prepend(cardElement);
}

renderCards();


function openImg(link, name) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openModal(popupImageCard);
}

function handleRenameSubmit(evt) {
  evt.preventDefault();

  profTitle.textContent = nameInput.value;
  profDescr.textContent = jobInput.value;
  nameInput.value = "";
  jobInput.value = "";
  closeModal(popupEditCard)
}

function handleAddCardSumbit(evt) {
  evt.preventDefault();

  if (imgName.value && imgLink.value) {
    addCard(imgName.value, imgLink.value);
    imgName.value = "";
    imgLink.value = "";
  }
  closeModal(popupNewCard);
}

formEditElement.addEventListener('submit', handleRenameSubmit)

formAddElement.addEventListener('submit', handleAddCardSumbit)