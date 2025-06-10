export function closeModal() {
  document.querySelector('.popup_is-opened').classList.remove("popup_is-opened");
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened", "popup_is-animated");
}