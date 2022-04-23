const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/";

function botAdd(){
   let page = document.querySelector(".container");
   page.innerHTML = "<link href= 'www.google.com.br'>";

}

let promise = axios.get(API + "quizzes");
promise.then(renderAllQuizzes);
let quizzes = promise.data; 


function test(promise) {
    console.log(promise.data);
}

function renderAllQuizzes(response) {
    let listQuizzes = document.querySelector("ul");
    let quizzes = response.data
    console.log(quizzes);
    for(let i = 0; i < quizzes.length; i++) {
        listQuizzes.innerHTML += `
        <li id="${quizzes[i].id} "onclick=changeDisplay('initialScreen'); getQuizz(this.getAtribute("id"))"> <h3>${quizzes[i].title}</h3>
         <img class ="imagemQuizz" src="${quizzes[i].image}" alt="">
        </li>
        `
       
    }
}

function getId(tag) {
    document.querySelectorAll(".li");
    id = tag.ge
    console.log("id: " + tag)
    return tag.id;
}

function getQuizz(tag, id) {
    let response = axios.get(`${API} quizzes/1`)
    promise.then(renderQuizzQuestions);
}

function renderQuizzQuestions(response) {
    let quizz = response.data;
    console.log(quizz);
    let tag = document.querySelector(".especificQuizz");
    tag.innerHTML += ``
    
}

function changeDisplay(parameter) {
    let tag = document.querySelector("." + parameter);
    
    if(tag.classList.contains("initialScreen")) {
        tag.classList.add("hidden");
        document.querySelector(".especificQuizz").classList.remove("hidden");
    }
    
}



