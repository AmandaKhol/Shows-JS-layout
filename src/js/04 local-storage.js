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
