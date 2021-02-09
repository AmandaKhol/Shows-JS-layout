'use strict';

const filterInput = document.querySelector('.js-filter');
const formElement = document.querySelector('.js-form');
const searchButton = document.querySelector('.js-search');
const showsContainer = document.querySelector('.js-shows-list');
const favoritesContainer = document.querySelector('.js-fav-list');
const reset = document.querySelector('.js-reset');

let shows = [];
let favorites = [];

// prueba de maquetación

filterInput.value = 'friends';
getDataFromApi();

function getDataFromApi() {
  fetch(`http://api.tvmaze.com/search/shows?q=${filterInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      renderShowsResult();
    })
    .catch((error) => error);
}
function renderShowsResult() {
  showsContainer.innerHTML = '';
  for (const show of shows) {
    renderShowItem(show);
  }
  addEventListenerShows();
}

function renderFavResults() {
  favoritesContainer.innerHTML = '';
  for (const fav of favorites) {
    renderFavItem(fav);
  }
  addEventListenerFavs();
}

function renderShowItem(show) {
  //list item
  let showItem = document.createElement('li');
  if (isFavShow(show)) {
    showItem.classList.add('show', 'js-show', 'show__marked');
  } else {
    showItem.classList.add('show', 'js-show');
  }
  showItem.dataset.id = show.show.id;
  showsContainer.appendChild(showItem);
  renderShowCard(show, showItem);
}

function renderFavItem(fav) {
  //list item
  let favItem = document.createElement('li');
  favItem.classList.add('show', 'show__fav', 'js-fav');
  favItem.dataset.id = fav.show.id;
  favoritesContainer.appendChild(favItem);
  //show card
  renderShowCard(fav, favItem);
  //close symbol
  renderCloseSymbol(favItem);
}

function renderShowCard(show, showItem) {
  //title
  let showTitleElement = document.createElement('h3');
  showTitleElement.classList.add('show__title');
  showItem.appendChild(showTitleElement);
  let showTitleContent = document.createTextNode(show.show.name);
  showTitleElement.appendChild(showTitleContent);
  //image
  let showImage = document.createElement('img');
  showImage.classList.add('show__image');
  if (show.show.image === null) {
    showImage.src =
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
  } else {
    showImage.src = show.show.image.medium;
  }
  showImage.alt = show.show.name;
  showItem.appendChild(showImage);
}

function renderCloseSymbol(favItem) {
  let closeIcon = document.createElement('span');
  closeIcon.classList.add('close-icon');
  let closeSymbol = document.createTextNode('\u2716');
  closeIcon.appendChild(closeSymbol);
  favItem.appendChild(closeIcon);
}

function isFavShow(show) {
  const favoriteFound = favorites.find((favorite) => {
    return favorite.show.id === show.show.id;
  });
  if (favoriteFound === undefined) {
    return false;
  } else {
    return true;
  }
}

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
function paintFavoritesFromLocalStorage() {
  const localStorageFavorites = localStorage.getItem('favorites');
  favorites = JSON.parse(localStorageFavorites);
  if (favorites === null) {
    favorites = [];
  }
  renderFavResults();
}

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function handleSearch() {
  getDataFromApi();
}

function handleFavShow(ev) {
  const clickedShowId = parseInt(ev.currentTarget.dataset['id']);
  //check if the show exists in favorites
  const favoritesFoundIndex = favorites.findIndex(
    (favorite) => favorite.show.id === clickedShowId
  );
  if (favoritesFoundIndex === -1) {
    //add to favorite list the show object
    const showFound = shows.find(function (show) {
      return show.show.id === clickedShowId;
    });
    favorites.push(showFound);
  } else {
    //remove from favorites
    favorites.splice(favoritesFoundIndex, 1);
  }
  saveFavorites();
  renderFavResults();
  renderShowsResult();
}

function handleForm(ev) {
  ev.preventDefault();
}

function handleReset() {
  favorites = [];
  localStorage.removeItem('favorites');
  renderFavResults();
  renderShowsResult();
}

paintFavoritesFromLocalStorage();

searchButton.addEventListener('click', handleSearch);
formElement.addEventListener('submit', handleForm);
reset.addEventListener('click', handleReset);
