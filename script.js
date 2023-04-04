// xnGT2Nn0hGpLixzCIB4cUIODwydy6icTWY5R2YfL
let title = document.querySelector(".heading");
let img1 = document.querySelector(".img");
let pictureDetails = document.querySelector(".para");
let searchDate = document.querySelector("#search-input");
let btn = document.querySelector("#search");
let searchResult= document.getElementById('search-result') ;
let searches = JSON.parse(localStorage.getItem("searches")) || [];


function getCurrentImageOfTheDay(){
    let date = new Date().toISOString().split("T")[0];
    console.log(date) ;
    fetch(`https://api.nasa.gov/planetary/apod?api_key=xnGT2Nn0hGpLixzCIB4cUIODwydy6icTWY5R2YfL&date=${date}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            title.innerHTML = `<h1>NASA Picture of Day: ${data.date} </h1>`;
            img1.innerHTML = `<img src="${data.hdurl}">`;
            pictureDetails.innerHTML = `<h3>${data.title}</h3> <p> ${data.explanation} </p>`;
        }) 
}

getCurrentImageOfTheDay();

btn.addEventListener('click', getImageOfTheDay);
let newDate = searchDate.value;

function getImageOfTheDay(newDate){

    fetch(`https://api.nasa.gov/planetary/apod?api_key=xnGT2Nn0hGpLixzCIB4cUIODwydy6icTWY5R2YfL&date=${newDate}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            title.innerHTML = `<h1>NASA Picture of Day: ${data.date} </h1>`;
            img1.innerHTML = `<img src="${data.hdurl}">`;
            pictureDetails.innerHTML = `<h3>${data.title} </h3> <p> ${data.explanation} </p>`;
        })
        saveSearch(newDate) ;
        addSearchToHistory() ;
}

function saveSearch(newDate){
    searches.push(newDate);
    localStorage.setItem("searches", JSON.stringify(searches));

}
function addSearchToHistory() {
    searchResult.innerHTML = "";
  
    for (let i = searches.length - 1; i >= 0; i--) {
      const searchItem = document.createElement("li");
      searchItem.innerText = searches[i];

      searchItem.addEventListener("click", () => {
        getImageOfTheDay(searches[i]);
      });
      searchResult.appendChild(searchItem);
    }
  }
