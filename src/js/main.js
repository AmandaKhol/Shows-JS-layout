/* eslint-disable quotes */
/* eslint-disable indent */
'use strict';


const filterInput = document.querySelector('.js-filter');
const formElement = document.querySelector('.js-form');
const searchButton = document.querySelector('.js-search');
const showsContainer = document.querySelector('.js-shows-list');
const favoritesContainer = document.querySelector('.js-fav-list');
const showSection = document.querySelector('.section-films');

let shows = [];
let favorites = [];


// prueba de maquetación

filterInput.value = "friends";
getDataFromApi();

function getDataFromApi() {
    fetch(`http://api.tvmaze.com/search/shows?q=${filterInput.value}`)
  .then(response => response.json())
        .then(data => {
            shows = data;
            showsPaint();
        }).catch(error => `Error en la recolección. Error ${error}.`);
}

function handleSearch() {
    getDataFromApi();
}

function handleFavShow(ev) {
    const clickedShowId = parseInt(ev.currentTarget.dataset['id']);
    //miro si ya estaba en favoritos
    const favoritesFoundIndex = favorites.findIndex(favorite => favorite.show.id === clickedShowId );
    if (favoritesFoundIndex === -1) {
        //push: Añado favorito a la lista */
    const showFound = shows.find(function (show) {
        console.log(show.show.id);
        return show.show.id === clickedShowId;
        });
        favorites.push(showFound);
        const showFavPaint = showsContainer.querySelector(`[data-id="${clickedShowId}"]`);
        showFavPaint.classList.add("fav-show-marked");
        console.log(showFavPaint);
    } else {
        const showRePaint = showsContainer.querySelector(`[data-id="${clickedShowId}"]`);
        favorites.splice(favoritesFoundIndex, 1);
        showRePaint.classList.remove("fav-show-marked");
    }
    saveFavorites();
    favPaint();
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function handleForm(ev) {
    ev.preventDefault();
}

function showsPaint() {
    showsContainer.innerHTML = "";
/*     if (shows.length === 0) {
        let showWarningElement = document.createElement('p');
        showWarningElement.classList.add('empty-result');
        showSection.appendChild(showWarningElement);
        let showWarningMessage = document.createTextNode("no hay resultados");
        showWarningElement.appendChild(showWarningMessage);
    } */
    for (const show of shows) {
        //list item
        let showItem = document.createElement('li');
        showItem.classList.add('show', 'js-show');
        showItem.dataset.id = show.show.id;
        showsContainer.appendChild(showItem);
        //title
        let showTitleElement = document.createElement('h3');
        showTitleElement.classList.add('show__title');
        showItem.appendChild(showTitleElement);
        let showTitleContent = document.createTextNode(show.show.name);
        showTitleElement.appendChild(showTitleContent);
        //image
        let imageContainer = document.createElement('div');
        imageContainer.classList.add("show__img--container");
        showItem.appendChild(imageContainer);
        let showImage = document.createElement('img');
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
    const showItems = document.querySelectorAll(".js-show");
    for (const showItem of showItems) {
        showItem.addEventListener("click", handleFavShow);

    }
}
  
function favPaint() {
    favoritesContainer.innerHTML = "";
    
/*     if (shows.length === 0) {
        let showWarningElement = document.createElement('p');
        showWarningElement.classList.add('empty-result');
        showSection.appendChild(showWarningElement);
        let showWarningMessage = document.createTextNode("no hay resultados");
        showWarningElement.appendChild(showWarningMessage);
    } */
    for (const fav of favorites) {
        //list item
        let favItem = document.createElement('li');
        favItem.classList.add('show', 'js-fav');
        favItem.dataset.id = fav.show.id;
        favoritesContainer.appendChild(favItem);
        //title
        let favTitleElement = document.createElement('h3');
        favTitleElement.classList.add('show__title');
        favItem.appendChild(favTitleElement);
        let favTitleContent = document.createTextNode(fav.show.name);
        favTitleElement.appendChild(favTitleContent);
        //image
        let imageContainer = document.createElement('div');
        imageContainer.classList.add("show__img");
        favItem.appendChild(imageContainer);
        let favImage = document.createElement('img');
        favImage.classList.add("show__image");
        if (fav.show.image === null) {
            favImage.src =
                "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        } else {
            favImage.src = fav.show.image.medium;
        }
        favImage.alt = fav.show.name;
        imageContainer.appendChild(favImage);
    }
    const favItems = document.querySelectorAll(".js-fav");
    for (const favItem of favItems) {
        favItem.addEventListener("click", handleFavShow);
        
    }
    
}

function paintFavoritesFromLocalStorage() {
    const localStorageFavorites = localStorage.getItem("favorites");
    favorites = JSON.parse(localStorageFavorites);
    favPaint();
}

paintFavoritesFromLocalStorage();

searchButton.addEventListener("click", handleSearch);
formElement.addEventListener("submit", handleForm);