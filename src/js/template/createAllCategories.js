import { getAPI } from './api'; // ПРИКЛАД
import { $Books, currentCategory } from '../markup.js';

const containerAll = document.querySelector('.all-categories');
const bookCategory = document.querySelector('.categories__list');
const allCat = document.querySelector('.categories__link');

// Обробник для відкриття категорії
containerAll.addEventListener('click', onOpenCategory);

// клас "active" для вибраної категорії
allCat.classList.add('categories__item--active');

// Відправляємо GET-запит для отримання списку всіх доступних категорій
getAPI('category-list').then(({ data }) => {
  renderAllCategories(data); // Відображаємо всі категорії
});

// Відображення списку всіх доступних категорій
function renderAllCategories(data) {
  let markup = data
    .map(({ list_name }) => {
      return `<li class="categories__item categories__link" data-category="${list_name}">${list_name}</li>`;
    })
    .join('');
  containerAll.insertAdjacentHTML('beforeend', markup);
}

// Обробник події вибору категорії
function onOpenCategory(e) {
  e.preventDefault();
  if (e.target.classList.contains('categories__item')) {
    let renderCategory = e.target.dataset.category;
    $Books.container.innerHTML = ''; // Очищаємо контейнер
    const titleCat = renderCategory.split(' ');
    // Відправляємо GET-запит для отримання книг обраної категорії
    getAPI(`category?category=${renderCategory}`)
      .then(({ data }) => {
        allCat.classList.remove('categories__item--active'); // Видаляємо клас "active" з усіх категорій
        currentCategory(renderCategory); // Позначаємо активну категорію
        const allBooks = data
          .map(({ book_image, title, author, _id }) => {
            // Розмітка для всіх книг обраної категорії
            return `
            <li class="js-list-allBooks id=${_id}">
              <img src="${book_image}" alt="${title}" data-id="${_id}" class="img-bestBooks"/>
              <h3 class="js-named-bestBooks">${title}</h3>
              <p class="js-author-bestBooks">${author}</p>
            </li>`;
          })
          .join('');
        // Заголовок категорії та розмітка всіх книг
        $Books.container.insertAdjacentHTML(
          'afterbegin',
          `<h1 class="title-book">${titleCat
            .slice(0, titleCat.length - 1)
            .join(' ')} <span>${titleCat.pop()}</span></h1>`
        );
        $Books.container.insertAdjacentHTML('beforeend', allBooks);
        if (data === 0) {
          // Виводимо повідомлення, якщо немає книг у цій категорії
          alert('There are no books in this category');
        }
      })
      .catch(error => console.error(error));
  }
}
