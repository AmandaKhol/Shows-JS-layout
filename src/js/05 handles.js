function handleSearch() {
  restartWarning();
  getDataFromApi();
}

function handleFavShow(ev) {
  restartWarning();
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
