const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

function botAdd(){
   let page = document.querySelector(".container");
   page.innerHTML = "<link href= 'www.googe.com'>";

}

function getQuizzes() {
    let promise = axios.get(API);
    promise.then(renderAllQuizzes);
}

//let quizzes = promise.data; 


function test(promise) {
    console.log(promise.data);
}

function renderAllQuizzes(response) {
    let listQuizzes = document.querySelector("ul");
    let quizzes = response.data;
    console.log(quizzes);
    for(let i = 0; i < quizzes.length; i++) {
        listQuizzes.innerHTML += `
        <li id="${quizzes[i].id}" onclick=changeDisplay('initialScreen','especificQuizz');getQuizz(this.getAttribute("id"))><h3>${quizzes[i].title}</h3>
         <img class ="imagemQuizz" src="${quizzes[i].image}" alt="">
        </li>
        `
    }
}


function getQuizz(id) {
    console.log(id);
    let promise = axios.get(`${API}/${id}`)
    promise.then(renderQuizzQuestions);
}

function renderQuizzQuestions(response) {
    let quizz = response.data;
    console.log(quizz);
    let tag = document.querySelector(".especificQuizz");
    tag.innerHTML += `
    <div class="banner">
        <img src="${quizz.image}" alt=""  width="100%" height="227">
        <h1>${quizz.title}</h1>
    </div>
    <div class="container"> testandoi
        <div class="question"> 
            <div class="topo">

            </div>
        </div>

    </div>
    `
    
}

function changeDisplay(a, b) {
    let tag = document.querySelector("." + a);
    
    tag.classList.add("hidden");
    document.querySelector("." + b).classList.remove("hidden");
    
    
}

getQuizzes();
