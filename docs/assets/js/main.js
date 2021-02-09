"use strict";const filterInput=document.querySelector(".js-filter"),formElement=document.querySelector(".js-form"),searchButton=document.querySelector(".js-search"),showsContainer=document.querySelector(".js-shows-list"),showsSection=document.querySelector(".shows-section"),favoritesContainer=document.querySelector(".js-fav-list"),reset=document.querySelector(".js-reset"),filterSection=document.querySelector(".filter-section");let shows=[],favorites=[];function getDataFromApi(){fetchToApiAndRenderResults()}function fetchToApiAndRenderResults(){fetch("http://api.tvmaze.com/search/shows?q="+filterInput.value).then(e=>e.json()).then(e=>{shows=e,0===shows.length&&renderErrorMessage("no hay resultados para tu búsqueda"),renderShowsResult()}).catch(e=>{renderErrorMessage("Servicio temporalmente no disponible")})}function renderShowsResult(){showsContainer.innerHTML="",0!==shows.length&&showsSection.classList.remove("hidden");for(const e of shows)renderShowItem(e);addEventListenerShows()}function renderFavResults(){favoritesContainer.innerHTML="";for(const e of favorites)renderFavItem(e);addEventListenerFavs()}function renderShowItem(e){renderShowCard(e,showCardElementCreation(e))}function renderFavItem(e){let t=favCardElementCreation(e);renderShowCard(e,t),renderCloseSymbol(t)}function renderShowCard(e,t){showCardTitle(e,t),showCardImage(e,t)}function renderCloseSymbol(e){let t=document.createElement("span");t.classList.add("close-icon");let n=document.createTextNode("✖");t.appendChild(n),e.appendChild(t)}function renderErrorMessage(e){let t=document.createElement("span");t.classList.add("warning");let n=document.createTextNode(e);filterSection.appendChild(t),t.appendChild(n)}function showCardElementCreation(e){let t=document.createElement("li");return isFavShow(e)?t.classList.add("show__item","js-show","show__item--marked"):t.classList.add("show__item","js-show"),t.dataset.id=e.show.id,showsContainer.appendChild(t),t}function favCardElementCreation(e){let t=document.createElement("li");return t.classList.add("show__item","show__fav","js-fav"),t.dataset.id=e.show.id,favoritesContainer.appendChild(t),t}function showCardTitle(e,t){let n=document.createElement("h3");n.classList.add("show__item--title"),t.appendChild(n);let o=document.createTextNode(e.show.name);n.appendChild(o)}function showCardImage(e,t){let n=document.createElement("img");n.classList.add("show__item--image"),null===e.show.image?n.src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV":n.src=e.show.image.medium,n.alt=e.show.name,n.title=e.show.name,t.appendChild(n)}function isFavShow(e){return void 0!==favorites.find(t=>t.show.id===e.show.id)}function restartWarning(){const e=document.querySelector(".warning");null!==e&&e.parentNode.removeChild(e)}function paintFavoritesFromLocalStorage(){const e=localStorage.getItem("favorites");favorites=JSON.parse(e),null===favorites&&(favorites=[]),renderFavResults()}function saveFavorites(){localStorage.setItem("favorites",JSON.stringify(favorites))}function handleSearch(){restartWarning(),getDataFromApi()}function handleFavShow(e){restartWarning();const t=parseInt(e.currentTarget.dataset.id),n=favorites.findIndex(e=>e.show.id===t);if(-1===n){const e=shows.find((function(e){return e.show.id===t}));favorites.push(e)}else favorites.splice(n,1);saveFavorites(),renderFavResults(),renderShowsResult()}function handleForm(e){e.preventDefault()}function handleReset(){favorites=[],localStorage.removeItem("favorites"),renderFavResults(),renderShowsResult()}function addEventListenerFavs(){const e=document.querySelectorAll(".js-fav");for(const t of e)t.addEventListener("click",handleFavShow)}function addEventListenerShows(){const e=document.querySelectorAll(".js-show");for(const t of e)t.addEventListener("click",handleFavShow)}searchButton.addEventListener("click",handleSearch),formElement.addEventListener("submit",handleForm),reset.addEventListener("click",handleReset),paintFavoritesFromLocalStorage(),restartWarning();