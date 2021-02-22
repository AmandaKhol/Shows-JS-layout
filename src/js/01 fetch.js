// Fetch to API TVMaze

function getDataFromApi() {
  fetchToApiAndRenderResults();
}

function fetchToApiAndRenderResults() {
  fetch(`//api.tvmaze.com/search/shows?q=${filterInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      const showsData = data;
      for (const dataItem of showsData) {
        shows.push(dataItem.show);
      }
      /* shows = data; */

      console.log(shows);
      if (shows.length === 0) {
        renderErrorMessage('no hay resultados para tu búsqueda');
      }
      renderShowsResult();
    })
    .catch((error) => {
      renderErrorMessage('Servicio temporalmente no disponible');
    });
}
