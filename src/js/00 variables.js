'use strict';

//Global variables

const filterInput = document.querySelector('.js-filter');
const formElement = document.querySelector('.js-form');
const searchButton = document.querySelector('.js-search');
const showsContainer = document.querySelector('.js-shows-list');
const showsSection = document.querySelector('.shows-section');
const favoritesContainer = document.querySelector('.js-fav-list');
const reset = document.querySelector('.js-reset');
const filterSection = document.querySelector('.filter-section');
/* const totalResults = document.querySelector('.js-total'); */

const urlImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let shows = [];
let favorites = [];
/* const interview = [2, 5, 9]; */
