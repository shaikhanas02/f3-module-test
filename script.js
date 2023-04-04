const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById(
  "current-image-container"
);
const currentImage = document.getElementById("current-image");
const currentDetail = document.getElementById("current-detail");
const searchHistory = document.getElementById("search-history");

let searches = JSON.parse(localStorage.getItem("searches")) || [];

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const date = searchInput.value;
    getImageOfTheDay(date);
  });

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=xnGT2Nn0hGpLixzCIB4cUIODwydy6icTWY5R2YfL&date=${currentDate}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      currentDetail.innerHTML = `<h2>${data.title}</h2><p>${data.explanation}</p>`;
      currentImage.style.backgroundImage = `url(${data.url})`;
    })
    .catch((error) => {
      console.error(error);
    });
}

getCurrentImageOfTheDay();

function getImageOfTheDay(date) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=xnGT2Nn0hGpLixzCIB4cUIODwydy6icTWY5R2YfL&date=${date}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      currentImage.style.backgroundImage = `url(${data.url})`;
      currentDetail.innerHTML = `<h2>${data.title}</h2><p>${data.explanation}</p>`;

      saveSearch(date);
      addSearchToHistory();
    })
    .catch((error) => {
      console.error(error);
    });
}

function saveSearch(date) {
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory() {
  searchHistory.innerHTML = "";

  for (let i = searches.length - 1; i >= 0; i--) {
    const Item = document.createElement("li");
    Item.innerText = searches[i];
    Item.addEventListener("click", () => {
      getImageOfTheDay(searches[i]);
    });
    searchHistory.appendChild(Item);
  }
}

addSearchToHistory();