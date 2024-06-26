import { getImages } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import imageUrl from '../src/img/javascript.svg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
  galleryElem: document.querySelector('.gallery'),
  searchBtn: document.querySelector('.search-btn'),
  formElem: document.querySelector('.search-form'),
  inputElem: document.querySelector('.search-input'),
  galleryItem: document.querySelector('.gallery-item'),
  loader: document.querySelector('.loader'),
  btnLoadMore: document.querySelector('.btn-load-more'),
};

let query = '';
let currentPage = 1;
let maxPage = 1;
const perPage = 15;

new SimpleLightbox('.gallery a', {
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formElem.addEventListener('submit', async e => {
  e.preventDefault();
  currentPage = 1;
  showLoader();
  query = refs.inputElem.value.trim();
  if (query.length <= 0) {
    iziToast.show({
      iconUrl: imageUrl,
      title: 'Error',
      titleColor: 'white',
      message: 'This field must be filled in',
      messageColor: 'white',
      messageSize: '16px',
      backgroundColor: '#ef4040',
      position: 'topRight',
      theme: 'dark',
    });
    hideLoader();
    refs.formElem.reset();
  } else {
    try {
      const data = await getImages(query, currentPage);
      console.log(data);
      maxPage = Math.ceil(data.total / perPage);
      console.log(maxPage);
      if (data.hits.length > 0) {
        const markup = imagesTemplate(data);
        refs.galleryElem.innerHTML = markup;
        updateBtnStatus();
        new SimpleLightbox('.gallery-item a', {
          captionsData: 'alt',
          captionDelay: 250,
        }).refresh();
      } else {
        iziToast.show({
          iconUrl: imageUrl,
          title: 'Error',
          titleColor: 'white',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: 'white',
          messageSize: '16px',
          backgroundColor: '#ef4040',
          position: 'topRight',
          theme: 'dark',
        });

        hideLoader();
      }
    } catch (error) {
      iziToast.show({
        iconUrl: imageUrl,
        title: 'Error',
        titleColor: 'white',
        message: 'Error!',
        messageColor: 'white',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        position: 'topRight',
        theme: 'dark',
      });
    }

    hideLoader();

    refs.formElem.reset();
  }
});

refs.btnLoadMore.addEventListener('click', async e => {
  e.preventDefault();
  currentPage++;
  const data = await getImages(query, currentPage);
  const markup = imagesTemplate(data);
  refs.galleryElem.insertAdjacentHTML('beforeend', markup);
  updateBtnStatus();
});

function showLoader() {
  refs.loader.classList.remove('hidden');
}
function hideLoader() {
  refs.loader.classList.add('hidden');
}

function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hiddenBtnLoadMore();
  } else {
    showBtnLoadMore();
  }
}

function showBtnLoadMore() {
  refs.btnLoadMore.classList.remove('hidden');
}
function hiddenBtnLoadMore() {
  refs.btnLoadMore.classList.add('hidden');
}