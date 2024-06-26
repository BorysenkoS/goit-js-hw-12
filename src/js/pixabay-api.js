import axios from 'axios';

export async function getImages(query, currentPage) {
  axios.defaults.baseURL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    key: '44427919-32b813221576803201dca5eed',
    q: query,
    image_type: 'photo',
    orientation: 'horisontal',
    safesearch: 'true',
    per_page: 15,
    page: currentPage,
  });

  try {
    const res = await axios.get('', { params });
    return res.data;
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
}
