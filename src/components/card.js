import { deleteCard, likeCard } from './api.js'
export function createCard(item, openImg, currentUserId) {

    const cardElement = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true)
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeBtn = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');

    if (item.owner._id !== currentUserId) {
        deleteButton.remove();
    }

    cardElement.querySelector(".card__image").src = item.link;
    cardElement.querySelector(".card__image").alt = item.name;
    cardElement.querySelector(".card__title").textContent = item.name;
    if (item.owner._id === currentUserId) {
        deleteButton.addEventListener("click", (event) => {
            deleteCard(item._id)
                .then(() => {
                    event.target.closest(".card").remove();
                })
                .catch(error => {
                    console.error('Ошибка при удалении карточки:', error);
                })
        })
    }

    likeCount.textContent = item.likes.length;
    likeBtn.classList.toggle('card__like-button_is-active', item.likes.some(user => user._id === currentUserId));
    likeBtn.addEventListener('click', (event) => {
        const isLiked = event.target.classList.contains('card__like-button_is-active');
        likeCard(item._id, isLiked)
            .then((json) => {
                likeCount.textContent = json.likes.length;
                event.target.classList.toggle('card__like-button_is-active');
            })
            .catch(error => {
                console.error('Ошибка при лайке карточки:', error);
            });
    });
    cardElement.querySelector(".card__image").addEventListener("click", (e) => {
        openImg(item.link, item.name);
    });
    return cardElement;

}
