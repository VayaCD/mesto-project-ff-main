const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-40',
    headers: {
        authorization: '76f274ee-8715-4aa6-94f2-89c32651f665',
        'Content-Type': 'application/json'
    }
};

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

export const updateAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar })
    }).then(checkResponse);
};

export const updateUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    }).then(checkResponse);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    }).then(checkResponse);
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    }).then(checkResponse);
};

export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    }).then(checkResponse);
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(checkResponse);
};

export const likeCard = (cardId, isLiked) => {
    const method = isLiked ? 'DELETE' : 'PUT';
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: config.headers
    }).then(checkResponse);
};