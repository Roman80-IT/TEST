import axios from 'axios';

axios.defaults.baseURL = 'https://books-backend.p.goit.global/books/';

// дані про книги з використанням API
export async function getAPI(endPoint) {
  try {
    const response = await axios.get(`${endPoint}`);
    return response; // Повертаємо дані
  } catch (error) {
    console.error(error);
  }
}
