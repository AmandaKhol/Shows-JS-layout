// Renders

function renderShowsResult() {
  showsContainer.innerHTML = '';
  if (shows.length !== 0) {
    showsSection.classList.remove('hidden');
  }
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
  let showItem = showCardElementCreation(show);
  renderShowCard(show, showItem);
}

function renderFavItem(fav) {
  let favItem = favCardElementCreation(fav);
  renderShowCard(fav, favItem);
  renderCloseSymbol(favItem);
}

function renderShowCard(show, showItem) {
  showCardTitle(show, showItem);
  showCardImage(show, showItem);
}

function renderCloseSymbol(favItem) {
  let closeIcon = document.createElement('span');
  closeIcon.classList.add('close-icon');
  let closeSymbol = document.createTextNode('\u2716');
  closeIcon.appendChild(closeSymbol);
  favItem.appendChild(closeIcon);
}

function renderErrorMessage(stringMessage) {
  let warning = document.createElement('span');
  warning.classList.add('warning');
  let warningMessage = document.createTextNode(stringMessage);
  filterSection.appendChild(warning);
  warning.appendChild(warningMessage);
}
