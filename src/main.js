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
};

new SimpleLightbox('.gallery a', {
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formElem.addEventListener('submit', e => {
  e.preventDefault();
  showLoader();
  const userText = refs.inputElem.value.trim();
  if (userText.length <= 0) {
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
    getImages(userText)
      .then(data => {
        if (data.hits.length > 0) {
          const markup = imagesTemplate(data);
          refs.galleryElem.innerHTML = markup;

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
      })
      .catch(ERROR => {
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
      })
      .finally(() => {
        hideLoader();
      });
    refs.formElem.reset();
  }
});

function showLoader() {
  refs.loader.classList.remove('hidden');
}
function hideLoader() {
  refs.loader.classList.add('hidden');
}
