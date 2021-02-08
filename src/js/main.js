/* eslint-disable quotes */
/* eslint-disable indent */
'use strict';


const filterInput = document.querySelector('.js-filter');
const formElement = document.querySelector('.js-form');
const searchButton = document.querySelector('.js-search');
const showsContainer = document.querySelector('.js-shows');
const favoritesContainer = document.querySelector('.js-fav');
const showSection = document.querySelector('.section-films');

let shows = [];
let favorites = [];

// api

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
    favorites.push(ev.currentTarget);
    console.log("favorites" + favorites);
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
        imageContainer.classList.add("show__img");
        showItem.appendChild(imageContainer);
        let showImage = document.createElement('img');
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

searchButton.addEventListener("click", handleSearch);
formElement.addEventListener("submit", handleForm);