import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '34901251-e528368449684f37c93d349fd';

const searchQuery = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImagesByQuery = async (query, page) => {
  try {
    const { data } = await axios.get(
      `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=${searchQuery.image_type}&orientation=${searchQuery.orientation}&per_page=${searchQuery.per_page}`
    );

    return data;
  } catch (error) {
    alert('Error fetching images');
  }
};

export const getPerPage = () => {
  return searchQuery.per_page;
};
