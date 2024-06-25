export function getImages(userText) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: '44427919-32b813221576803201dca5eed',
    q: userText,
    image_type: 'photo',
    orientation: 'horisontal',
    safesearch: 'true',
    per_page: 50,
  });

  const url = `${BASE_URL}?${params}`;
  return fetch(url)
    .then(res => res.json())
    .catch(error => {
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
    });
}
