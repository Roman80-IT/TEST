import * as fonds from './js/fonds/fonds';
import * as modals from './js/modals/modals';
// import axios from 'axios'; // axios
import { fetchCategoryList, fetchAllBooks } from './js/api/api-categories';
import { fetchCategoryTop } from './js/api/api';
import { addMarkupCategoryList } from './js/helpers/helpers';
import { markupCategoryList } from './js/template/markup';
import { createMarkupTopBooks } from './js/template/markup';
import refs from './js/refs/refs';

//----------------------Category List-----------------------------------------

const allCategories = async () => {
  try {
    const resp = await fetchCategoryList();

    addMarkupCategoryList(refs.listCategoryEl, markupCategoryList(resp.data));
  } catch (error) {
    console.log(error.message);
  }
};

allCategories();

//-------------------All Books Of Category---------------------------------------

refs.listCategoryEl.addEventListener('click', onShowAllBooks);
let nameOfCategory = 0;

async function onShowAllBooks(event) {
  event.preventDefault();

  if (!event.target.classList.contains('item-category')) return;

  nameOfCategory = event.target.textContent;

  try {
    const resp = await fetchAllBooks(nameOfCategory);
    addMarkupCategoryList(refs.listAllBooksEl, markupAllBooks(resp.data));
    // console.log(resp.data);
  } catch (error) {
    console.log(error.message);
  }
}

//------------------- Top Of Books ---------------------------------------

// refs.listCategoryEl.addEventListener('click', getTopOfBooks);
// let selectedCategory = 0;

// function addMarkup(element, markup) {
//   element.insertAdjacentHTML('beforeend', markup);
// }

// async function getTopOfBooks() {
//   try {
//     const data = await fetchCategoryTop();

//     console.log(data.data);

//     for (const item of data.data) {
//       addMarkup(containerEl, createMarkupTopBooks(item.books));
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// }

//-------------------All Top Of Books ---------------------------------------

// refs.listCategoryEl.addEventListener('click', getTopOfBooks);

// async function getTopOfBooks() {
//   try {
//     const data = await fetchCategoryTop();
//     addMarkup(refs.listAllBooksEl, markupTopBooks(data.data));
//   } catch (err) {
//     console.log(err.message);
//   }
// }

const topBooks = async () => {
  try {
    const resp = await fetchTopBooks();
    for (const item of resp.data) {
      refs.listAllBooksEl.insertAdjacentHTML(
        'beforeend',
        <h2>${item.list_name}</h2>
      );

      for (const book of item.books) {
        console.log(item.books);
        addMarkupTopBooks(refs.listAllBooksEl, markupAllBooks(item.books));
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

topBooks();
