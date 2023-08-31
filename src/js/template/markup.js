// import { getBooksAPI } from './js/api'; - ПРИКЛАД

const $Books = {
  bestBooks: document.querySelector('.title-book'),
};

// Обробник на кнопку SeeMore
$Books.container.addEventListener('click', onLoadSeeMore);

// Початкове завантаження
homeStart();

// Початковий список книг
function homeStart() {
  return getAPI('top-books').then(({ data }) => {
    $Books.container.insertAdjacentHTML(
      `<h1 class="title-book">Best Sellers <span>Books</span></h1>` // заголовок "Best Sellers Books"
    );
    // + Список кращих книг
    $Books.container.insertAdjacentHTML('beforeend', markupCategory(data));
    if (data === 0) {
      alert('There are no books in this category'); // Повідомлення - немає книг у цій категорії
    }
  });
}

// Розмітка списку книг
function markupList(books) {
  return books
    .map(({ book_image, title, author, _id }) => {
      return `<li class="js-list-bestBooks" id="${_id}">
      <img src="${book_image}" alt="${title}" data-id="${_id}" class="img-bestBooks"/>
      <h3 class="js-named-bestBooks">${title}</h3>
      <p class="js-author-bestBooks">${author}</p>
    </li>`;
    })
    .join('');
}

// Розмітки блока категорії
function markupCategory(data) {
  return data
    .map(({ list_name, books }) => {
      return `<h2 class="js-list">${list_name}</h2>
      <ul class="js-list-bestBooks">${markupList(books)}</ul>
      <btn class="js-btn-bestBooks" data-js="${list_name}">See more</btn>`;
    })
    .join('');
}

// Обробник "See more" та "quick view"
function onLoadSeeMore(e) {
  e.preventDefault();
  if (
    e.target.classList.contains('card-categories') ||
    e.target.classList.contains('card-text')
  ) {
    const id = e.target.dataset.id;
    e.target.addEventListener('click', openModal(id)); // Відкриття модального вікна
  }

  if (e.target.classList.contains('js-btn-bestBooks')) {
    // Обробка вибору категорії "See more"
    let seeMoreCategory = e.target.dataset.js;
    $Books.container.innerHTML = '';
    getAPI(`category?category=${seeMoreCategory}`)
      .then(({ data }) => {
        currentCategory(seeMoreCategory); // Позначаємо активну категорію
        $Books.chooseCat.classList.remove('categories__item--active');
        const titleCat = seeMoreCategory.split(' ');
        const allBooks = data
          .map(({ book_image, title, author, _id }) => {
            // Розмітка для всіх книг в обраній категорії
            return `
            <li class="js-list-allBooks" id="${_id}">
              <img src="${book_image}" alt="${title}" data-id="${_id}" class="img-bestBooks"/>
              <div class="card-hover-categories" data-id="${_id}"><p class="card-text-hover" data-id="${_id}">quick view</p></div>
              <h3 class="js-named-bestBooks">${title}</h3>
              <p class="js-author-bestBooks">${author}</p>
            </li>`;
          })
          .join('');
        // + заголовок категорії та розмітку всіх книг
        refsBooks.container.insertAdjacentHTML(
          `<h1 class="title-book">${titleCat
            .slice(0, titleCat.length - 1)
            .join(' ')} <span>${titleCat.pop()}</span></h1>`
        );
        $Books.container.insertAdjacentHTML('beforeend', allBooks);
        if (data === 0) {
          alert('There are no books in this category'); // Повідомлення - немає книг у цій категорії
        }
      })
      .catch(error => console.error(error));
  }
}
