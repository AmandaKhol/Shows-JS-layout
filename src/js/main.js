/* eslint-disable quotes */
/* eslint-disable indent */
"use strict";

const filterInput = document.querySelector(".js-filter");
const formElement = document.querySelector(".js-form");
const searchButton = document.querySelector(".js-search");
const showsContainer = document.querySelector(".js-shows-list");
const favoritesContainer = document.querySelector(".js-fav-list");
const reset = document.querySelector(".js-reset");
/* const showSection = document.querySelector('.shows-section'); */

let shows = [];
let favorites = [];

// prueba de maquetación

/* filterInput.value = "friends";
getDataFromApi(); */

function getDataFromApi() {
  fetch(`http://api.tvmaze.com/search/shows?q=${filterInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      showsPaint();
    })
    .catch((error) =>
      console.log("Hubo un problema con la petición Fetch:" + error.message)
    );
}
function showsPaint() {
  showsContainer.innerHTML = "";
  for (const show of shows) {
    //list item
    let showItem = document.createElement("li");
    if (isFavShow(show)) {
      showItem.classList.add("show", "js-show", "fav-show-marked");
    } else {
      showItem.classList.add("show", "js-show");
    }
    showItem.dataset.id = show.show.id;
    showsContainer.appendChild(showItem);
    renderShows(show, showItem);
  }
  const showItems = document.querySelectorAll(".js-show");
  for (const showItem of showItems) {
    showItem.addEventListener("click", handleFavShow);
  }
}

function favPaint() {
  favoritesContainer.innerHTML = "";
  for (const fav of favorites) {
    //list item
    let favItem = document.createElement("li");
    favItem.classList.add("show", "js-fav");
    favItem.dataset.id = fav.show.id;
    favoritesContainer.appendChild(favItem);
    renderShows(fav, favItem);
  }
  const favItems = document.querySelectorAll(".js-fav");
  for (const favItem of favItems) {
    favItem.addEventListener("click", handleFavShow);
  }
}

function renderShows(show, showItem) {
  //title
  let showTitleElement = document.createElement("h3");
  showTitleElement.classList.add("show__title");
  showItem.appendChild(showTitleElement);
  let showTitleContent = document.createTextNode(show.show.name);
  showTitleElement.appendChild(showTitleContent);
  //image
  let imageContainer = document.createElement("div");
  imageContainer.classList.add("show__img--container");
  showItem.appendChild(imageContainer);
  let showImage = document.createElement("img");
  showImage.classList.add("show__image");
  if (show.show.image === null) {
    showImage.src =
      "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
  } else {
    showImage.src = show.show.image.medium;
  }
  showImage.alt = show.show.name;
  imageContainer.appendChild(showImage);
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

function paintFavoritesFromLocalStorage() {
  const localStorageFavorites = localStorage.getItem("favorites");
  favorites = JSON.parse(localStorageFavorites);
  if (favorites === null) {
    favorites = [];
  }
  favPaint();
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
function handleSearch() {
  /*     if (shows.length === 0) {
        let showWarningElement = document.createElement('p');
        showWarningElement.classList.add('empty-result');
        showSection.appendChild(showWarningElement);
        let showWarningMessage = document.createTextNode("no hay resultados");
        showWarningElement.appendChild(showWarningMessage);
    } */
  getDataFromApi();
}

function handleFavShow(ev) {
  const clickedShowId = parseInt(ev.currentTarget.dataset["id"]);
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
  favPaint();
  showsPaint();
}

function handleForm(ev) {
  ev.preventDefault();
}

function handleReset() {
  favorites = [];
  localStorage.removeItem("favorites");
  favPaint();
  showsPaint();
}

paintFavoritesFromLocalStorage();

searchButton.addEventListener("click", handleSearch);
formElement.addEventListener("submit", handleForm);
reset.addEventListener("click", handleReset);
