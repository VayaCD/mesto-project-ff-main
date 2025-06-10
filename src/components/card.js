import { addCard } from "..";
import { popupNewCard } from "..";
import { closeModal } from "./modal";
import { popupEditCard } from "..";

export function openImg(e) {
    const popupImageCard = document.querySelector('.popup_type_image');
    const popupImg = popupImageCard.querySelector('.popup__image');
    const popupCaption = popupImageCard.querySelector('.popup__caption');
    popupImg.src = e.target.src;
    popupImg.alt = e.target.alt;
    popupCaption.textContent = e.target.alt;

    popupImageCard.classList.add("popup_is-opened", "popup_is-animated");
}

export function like(e) {
    e.target.classList.toggle('card__like-button_is-active')
}

export function deleteCard(event) {
    event.target.closest(".card").remove();
};

export function handleFormSubmit(evt) {
    evt.preventDefault();

    const profTitle = document.querySelector(".profile__title");
    const profDescr = document.querySelector(".profile__description");
    const nameInput = popupEditCard.querySelector('.popup__input_type_name');
    const jobInput = popupEditCard.querySelector('.popup__input_type_description');

    profTitle.textContent = nameInput.value;
    profDescr.textContent = jobInput.value;

    closeModal()
}

export function handleAddCardSumbit(evt) {
    evt.preventDefault();

    const imgName = popupNewCard.querySelector(".popup__input_type_card-name");
    const imgLink = popupNewCard.querySelector(".popup__input_type_url");

    if (imgName.value && imgLink.value) {
        addCard(imgName.value, imgLink.value);

        imgName.value = "";
        imgLink.value = "";
    }

    closeModal()
}