//HTML tags creation for each Element of the web

function showCardElementCreation(show) {
  let showItem = document.createElement('li');
  if (isFavShow(show)) {
    showItem.classList.add('show__item', 'js-show', 'show__item--marked');
  } else {
    showItem.classList.add('show__item', 'js-show');
  }
  showItem.dataset.id = show.id;
  showsContainer.appendChild(showItem);
  return showItem;
}

function favCardElementCreation(fav) {
  let favItem = document.createElement('li');
  favItem.classList.add('show__item', 'show__fav', 'js-fav');
  favItem.dataset.id = fav.id;
  favoritesContainer.appendChild(favItem);
  return favItem;
}

function showCardTitle(show, showItem) {
  let showTitleElement = document.createElement('h3');
  showTitleElement.classList.add('show__item--title');
  showItem.appendChild(showTitleElement);
  let showTitleContent = document.createTextNode(show.name);
  showTitleElement.appendChild(showTitleContent);
}

/* function showCardPremier(show, showItem) {
  let showPremierElement = document.createElement('p');
  showPremierElement.classList.add('show__item--premier');
  showItem.appendChild(showPremierElement);
  let showPremierContent = document.createTextNode(show.show.premiered);
  showPremierElement.appendChild(showPremierContent);
} */

function showCardImage(show, showItem) {
  let showImage = document.createElement('img');
  showImage.classList.add('show__item--image');
  if (show.image === null) {
    showImage.src = urlImage;
  } else {
    showImage.src = show.image.medium;
  }
  showImage.alt = show.name;
  showImage.title = show.name;
  showItem.appendChild(showImage);
}

//Additional functions

function isFavShow(show) {
  const favoriteFound = favorites.find((favorite) => {
    return favorite.id === show.id;
  });
  return favoriteFound === undefined ? false : true;
}

function restartWarning() {
  const warningMessage = document.querySelector('.warning');
  if (warningMessage !== null) {
    warningMessage.parentNode.removeChild(warningMessage);
  }
}
/* 
function totalResultsComputed() {
  totalResults.innerHTML = `${shows.length}`;
  return shows.length;
}
 */
