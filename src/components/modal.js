export function closeModal(popup) {
  document.removeEventListener("keydown",closePopupEsc);
  document.removeEventListener("click", closePopupOut);
  popup.classList.remove("popup_is-opened");
}

export function openModal(popup) {
  document.addEventListener("keydown", closePopupEsc);
  document.addEventListener("click",closePopupOut);
  popup.classList.add("popup_is-opened", "popup_is-animated");

}

function closePopupEsc(event) {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

function closePopupOut(event, popup) {
  {
    if (event.target.classList.contains('popup')) {
      closeModal(document.querySelector('.popup_is-opened'));
    }
  }
}