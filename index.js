// @todo: Темплейт карточки
// @todo: DOM узлы
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

const addBtn = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const btnCloseCard = popupNewCard.querySelector(".popup__close");
const userTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
const addCardBtn = popupNewCard.querySelector(".popup__button");

let cardsArray = [...initialCards];

addBtn.addEventListener("click", function () {
  popupNewCard.classList.add("popup_is-opened");
});

btnCloseCard.addEventListener("click", function () {
  popupNewCard.classList.remove("popup_is-opened");
});

function createCard(item) {
  const cardElement = userTemplate.cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__title").textContent = item.name;
  return cardElement;
}

function renderCards() {
  cardsList.innerHTML = "";
  cardsArray.forEach((card) => {
    const cardElement = createCard(card);
    cardsList.append(cardElement);
  });
  addDeleteListeners();
  addLikeListeners();
}

function addCard(name, link) {
  cardsArray.push({ name, link });
  renderCards();
}

renderCards();

addCardBtn.addEventListener("click", function () {
  const imgName = popupNewCard.querySelector(".popup__input_type_card-name");
  const imgLink = popupNewCard.querySelector(".popup__input_type_url");

  if (imgName.value && imgLink.value) {
    addCard(imgName.value, imgLink.value);

    imgName.value = "";
    imgLink.value = "";
    popupNewCard.classList.remove("popup_is-opened");
  }
});

function addDeleteListeners() {
  const deleteButtons = cardsList.querySelectorAll(".card__delete-button");
  deleteButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      cardsArray.splice(index, 1);
      renderCards();
    });
  });
}
