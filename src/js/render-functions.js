export function imageTemplate(image) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;
  return `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            <div class="gallery-describe">
              <p class="gallery-text">Likes <br>${likes}</p>
              <p class="gallery-text">Views<br>${views}</p>
              <p class="gallery-text">Comments<br>${comments}</p>
              <p class="gallery-text">Downloads<br>${downloads}</p>
            </div>
          </a>
        </li>`;
}

export function imagesTemplate(images) {
  return images.hits.map(imageTemplate).join('');
}
