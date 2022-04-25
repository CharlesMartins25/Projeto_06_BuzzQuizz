const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

const botAdd = () => {
   let page = document.querySelector(".criacaoQuizz");
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
   </button>
    `
}

const criarQuizz = () => {
    let pagCriação = document.querySelector(".container")
    pagCriação.innerHTML = `<button>Ola</button>`

}

function getQuizzes() {
    let promise = axios.get(API);
    promise.then(renderAllQuizzes);
}

function test(promise) {
    console.log(promise.data);
}

function renderAllQuizzes(response) {
    let listQuizzes = document.querySelector("ul");
    let quizzes = response.data
    console.log(quizzes);
    for(let i = 0; i < quizzes.length; i++) {
        listQuizzes.innerHTML += `
        <li id="${quizzes[i].id}" onclick=changeScreen('initialScreen','especificQuizz');getQuizz(this.getAttribute("id"))><h3>${quizzes[i].title}</h3>
         <img class ="imagemQuizz" src="${quizzes[i].image}" alt="">
        </li>
        `
    }
}


function getQuizz(id) {
    let promise = axios.get(`${API}/${id}`)
    promise.then(renderQuizzQuestions);
}

function renderQuizzQuestions(response) {
    let quizz = response.data;
    console.log("quizz: " + quizz);
    let questions = quizz.questions;
    console.log("questions: " + questions);

    
    let tag = document.querySelector(".especificQuizz");
    tag.innerHTML += `
    <div class="banner">
        <img src="${quizz.image}" alt=""  width="100%" height="227">
        <h1>${quizz.title}</h1>
    </div>
    `
    for (let i = 0; i < questions.length; i++ ) {

        
        let answers = questions[i].answers;
        console.log("answers: " + answers);
    
        tag.innerHTML += `
        <div class="container"> 
            <div class="question"> 
                <div class="questionContent">
                    <div class="topo" style = background-color:${questions[i].color}>
                        ${questions[i].title}
                    </div>
                    <div class="answersList answers-${i} ${i}">
                    </div>
                </div>
            </div>
        </div> 
         `
        renderAnswers(answers, i);
    }
}     

function randomNumber() {
    return Math.random() - 0.5;
}

function onclickAnswer(answer, isCorrect, tamanho, lista) {
    answer.classList.add("choosed");
    const pai = document.querySelector(`.answers-${lista}`);
    console.log(pai);
    
    for (let i = 1; i <= tamanho; i++) {
    let filho = pai.document.querySelector(".option" + i)
    if (!filho.classList.includes("choosed")) {
        filho.classList.add("unselected")
    }

    let todos = answer.querySelectorAll(".answerOption");
    console.log(todos); 
    }



//     let imagesAnswers = answer.querySelector(".answerOption img").closest(".answersList");
//     console.log(imagesAnswers);
//     let allAnswers = answer.querySelectorAll(".answerOption");

//   turnTransparent(imagesAnswers, answer);

}

function turnTransparent(options, answer) {


    // for (let i = 0; i < options.length; i++) {
    //   options[i].classList.add("unselected");
    // }
    // answer.querySelector("img").classList.add("user-choice");
}

function renderAnswers(answers, x ){
    
    const tag = document.querySelector(`.answers-${x}`);
    console.log("ghhdfhdhdf")
    answers.sort(randomNumber);
    for (let i = 0; i < answers.length; i++) {
        tag.innerHTML += `
        <div class ="answerOption option${i + 1}" onclick="onclickAnswer(this, ${answers[i].isCorrectAnswer}, ${answers.length}, ${x})">
            <img src="${answers[i].image}">
            <text class="texto">${answers[i].text}</text>
        </div>
        `
    }
} 


function changeScreen(a, b) {
    let tag = document.querySelector("." + a);
    tag.classList.add("hidden");
    document.querySelector("." + b).classList.remove("hidden");
}

getQuizzes();

