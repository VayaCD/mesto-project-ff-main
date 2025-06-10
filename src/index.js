import './styles/index.css';
import { initialCards as cardsArray } from './scripts/cards';
import { closeModal } from './components/modal';
import { openImg } from './components/card';
import { like } from './components/card';
import { deleteCard } from './components/card';
import { openModal } from './components/modal';
import { handleFormSubmit } from './components/card';
import { handleAddCardSumbit } from './components/card';

export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupEditCard = document.querySelector(".popup_type_edit");
const addBtn = document.querySelector(".profile__add-button");
const profEditBtn = document.querySelector(".profile__edit-button");
const btnCloseCard = document.querySelectorAll(".popup__close");
const userTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
const formElement = popupEditCard.querySelector('.popup__form');
const formAddElement = popupNewCard.querySelector('.popup__form')

addBtn.addEventListener("click", () => {
  openModal(popupNewCard);
});

profEditBtn.addEventListener("click", () => {
  openModal(popupEditCard);
})

btnCloseCard.forEach(button => {
  button.addEventListener("click", () => {
    closeModal();
  });
})
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup')) {
    closeModal();
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
})

function createCard(item, like, openImg) {
  const cardElement = userTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');

  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__title").textContent = item.name;
  deleteButton.addEventListener("click", deleteCard);

  likeBtn.addEventListener('click', like);

  cardElement.querySelector(".card__image").addEventListener("click", openImg);

  return cardElement;
}

function renderCards() {
  cardsList.innerHTML = "";
  cardsArray.forEach((card) => {
    const cardElement = createCard(card, like, openImg);
    cardsList.prepend(cardElement);
  });
}

export function addCard(name, link) {
  cardsArray.push({ name, link });
  renderCards();
}

renderCards();

formElement.addEventListener('submit', handleFormSubmit)

formAddElement.addEventListener('submit', handleAddCardSumbit)

