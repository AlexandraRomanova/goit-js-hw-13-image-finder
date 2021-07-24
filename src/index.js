import imageCardTpl from './templates/image-card.hbs';
import './css/styles.css'
import NewApiService from './js/apiService';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
// import LoadNMoreBtn from './js/load-more-btn';

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.btn-load-more'),
}

// const loadMoreBtn = new LoadNMoreBtn({
//     selector: '[data-action="load-more"]',
//     hidden: true,
// })

const newApiService = new NewApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault();
    
    newApiService.query = e.currentTarget.elements.query.value.trim();
    
    // Если ошибка
    if (newApiService.query.length === 0) {
        return onFetchError();
    }

    newApiService.resetPage();
    clearContainer();
    
    newApiService.fetchImages()
        .then(addImageMarkup)
        .catch(onFetchError);
    
    newApiService.fetchImages()
        .then(removeClassButton)
};

function onLoadMore() {
    newApiService.fetchImages()
        .then(addImageMarkup)
}

function addImageMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', imageCardTpl(hits));
    refs.galleryContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function removeClassButton(hits) {
    if (hits.length < 12) {
        return;
    }
    refs.loadMoreBtn.classList.remove('load-more');
}

function clearContainer() {
    refs.galleryContainer.innerHTML = '';
}

function onFetchError() {
    error({
        text: 'Sorry, no images could be found for this request!',
        sticker: false,
        hide: true,
        delay: 1500,
    })
}