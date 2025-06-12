function deleteCard(event) {
    event.target.closest(".card").remove();
};

export function createCard(item, like, openImg) {
    const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true)
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeBtn = cardElement.querySelector('.card__like-button');

    cardElement.querySelector(".card__image").src = item.link;
    cardElement.querySelector(".card__image").alt = item.name;
    cardElement.querySelector(".card__title").textContent = item.name;
    deleteButton.addEventListener("click", deleteCard);

    likeBtn.addEventListener('click', like);

    cardElement.querySelector(".card__image").addEventListener("click", (e) => {
        openImg(item.link, item.name);
    });

    return cardElement;
}

export function like(e) {
    e.target.classList.toggle('card__like-button_is-active')
}