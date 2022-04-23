const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

const botAdd = () => {
   let page = document.querySelector(".container");
   page.innerHTML =
   `
   <h3> Comece pelo começo </h3>
   <div class="quizzGeral">
 
  <div class="titleQuizz" >
  <input class="nameQ" name="title" type="text" placeholder="Titulo do seu quizz" focus>
  </div>
  <div class="imageUrl">
 <input class="nameQ" name="title" type="text" placeholder="URL da imagem do seu quizz" focus>
  </div>
  <div class="questionQtd">
  <input class="nameQ" name="title" type="text" placeholder="Quantidade de perguntas do seu quizz" focus>
  </div>
  <div class="levelsQtd">
  <input class="nameQ" name="title" type="text" placeholder="Quantidades de níveis do seu quizz" focus>
  </div>
   
   
   </div>
   <button onclick="criarQuizz()" class="botaoPag1Quizz">
   Prosseguir para criar perguntas
   </button>`
    
}
const criarQuizz = () => {
    let pagCriação = document.querySelector(".container")
    pagCriação.innerHTML = `<button>Ola</button>`

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


function getQuizz(tag, id) {
    let response = axios.get(`${API} quizzes/1`)
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


