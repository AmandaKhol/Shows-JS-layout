'use strict';

const filterInput = document.querySelector('.js-filter');
const formElement = document.querySelector('.js-form');
const searchButton = document.querySelector('.js-search');
const showsContainer = document.querySelector('.js-shows-list');
const favoritesContainer = document.querySelector('.js-fav-list');
const reset = document.querySelector('.js-reset');

let shows = [];
let favorites = [];
