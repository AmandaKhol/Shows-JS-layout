//Handles

function handleSearch() {
  restartWarning();
  getDataFromApi();
}

function handleFavShow(ev) {
  restartWarning();
  const clickedShowId = parseInt(ev.currentTarget.dataset['id']);
  updateShowFavList(clickedShowId);
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

function updateShowFavList(clickedShowId) {
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
}

function handleTotalResults(){
  const checkNumber = totalResultsComputed();
  for (const number of interview) {
    if (checkNumber < number) {
      console.log(`El número de series (${checkNumber}) es menor que  ${number}`);
    } else {
      console.log(`El número de series (${checkNumber}) es mayor que  ${number}`);
    }
    
  }
}