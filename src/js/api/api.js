import axios from 'axios';

const URL_CATEGORY_TOP = 'https://books-backend.p.goit.global/books/top-books ';

function fetchCategoryTop() {
  return axios.get({ URL_CATEGORY_TOP });
}

export { fetchCategoryTop };
