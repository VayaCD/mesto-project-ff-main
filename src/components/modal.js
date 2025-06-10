export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown",(evt) => closePopupEsc(evt, popup));
  document.removeEventListener("click", (evt) => closePopupOut(evt, popup));
}

export function openModal(popup) {
  document.addEventListener("keydown",(evt) => closePopupEsc(evt, popup));

  document.addEventListener("click",(evt) => closePopupOut(evt, popup));
  popup.classList.add("popup_is-opened", "popup_is-animated");
}

function closePopupEsc(event, popup) {
  if (event.key === 'Escape') {
    closeModal(popup);
  }
}

function closePopupOut(event, popup) {
  {
    if (event.target.classList.contains('popup')) {
      closeModal(popup);
    }
  }
}