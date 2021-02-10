//Event Listeners

function addEventListenerFavs() {
  const favItems = document.querySelectorAll('.js-fav');
  for (const favItem of favItems) {
    favItem.addEventListener('click', handleFavShow);
  }
}

function addEventListenerShows() {
  const showItems = document.querySelectorAll('.js-show');
  for (const showItem of showItems) {
    showItem.addEventListener('click', handleFavShow);
  }
}

searchButton.addEventListener('click', handleSearch);
formElement.addEventListener('submit', handleForm);
reset.addEventListener('click', handleReset);
