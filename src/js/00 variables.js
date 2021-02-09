'use strict';

const filterInput = document.querySelector('.js-filter');
const formElement = document.querySelector('.js-form');
const searchButton = document.querySelector('.js-search');
const showsContainer = document.querySelector('.js-shows-list');
const favoritesContainer = document.querySelector('.js-fav-list');
const reset = document.querySelector('.js-reset');
const filterSection = document.querySelector('.filter-section');

let shows = [];
let favorites = [];
