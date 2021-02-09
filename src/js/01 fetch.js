function getDataFromApi() {
  fetchToApiAndRenderResults();
}

function fetchToApiAndRenderResults() {
  fetch(`http://api.tvmaze.com/search/shows?q=${filterInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      renderShowsResult();
    })
    .catch((error) => error);
}
