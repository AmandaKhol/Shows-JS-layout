// Fetch to API TVMaze

function getDataFromApi() {
  fetchToApiAndRenderResults();
}

function fetchToApiAndRenderResults() {
  fetch(`http://api.tvmaze.com/search/shows?q=${filterInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      if (shows.length === 0) {
        renderErrorMessage('no hay resultados para tu búsqueda');
      }
      renderShowsResult();
    })
    .catch((error) => {
      renderErrorMessage('Servicio temporalmente no disponible');
    });
}
