//--------------------Create markup of category-list------------------------------
function markupCategoryList(arr) {
  return arr
    .map(
      ({ list_name }) =>
        `
      <li><a href="" class="item-category">${list_name}</a></li>
    `
    )
    .join('');
}

export { markupCategoryList };

//------------------Create markup of All Books---------------------------------------
function markupAllBooks(arr) {
  return arr
    .map(
      ({ _id, title, author, book_image }) =>
        `
      <li class="card-set-item" data-id="${_id}">      
      <a href="" >
      <img src="${book_image}" width="180px" height="226px" class="book-img"/>
      <h3 class="book-title">${title}</h3>
      <p class="book-author">${author}</p>
      </a></li>
    `
    )
    .join('');
}

// export { markupCategoryList, markupAllBooks };

//----------------------Create markup Top Books -----------------------------------

function markupTopBooks(arr) {
  return arr
    .map(
      ({ _id, title, book_image, author }) => `
    <li class="card-set-item" data-id="${_id}">
      <a href="" >
      <img src="${book_image}" width="180px" height="256px" class="book-img"/>
      <h3 class="book-title">${title}</h3>
      <p class="book-author">${author}</p>
      </a></li>

    `
    )
    .join('');
}
export { markupCategoryList, markupAllBooks, markupTopBooks };
