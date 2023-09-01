import * as fonds from './js/fonds/fonds';
import * as modals from './js/modals/modals';
import axios from 'axios'; // axios
import { fetchCategoryList, fetchAllBooks } from './js/api/api-categories';
import { fetchCategoryTop } from './js/api/api';
import { addMarkupCategoryList } from './js/helpers/helpers';
import { markupCategoryList } from './js/template/markup';
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

    console.log(resp.data);
  } catch (error) {
    console.log(error.message);
  }
}

//-------------------All Top Of Books ---------------------------------------

function addMarkup(element, markup) {
  element.insertAdjacentHTML('beforeend', markup);
}

async function getTopOfBooks() {
  try {
    const data = await fetchCategoryList();

    console.log(data.data);

    for (const item of data.data) {
      addMarkup(containerEl, createMarkupTopBooks(item.books));
    }
  } catch (err) {
    console.log(err.message);
  }
}
