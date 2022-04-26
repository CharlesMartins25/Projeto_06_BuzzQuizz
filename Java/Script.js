const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

let correctAnswers = 0;

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
    position = id;
    let promise = axios.get(`${API}/${id}`)
    promise.then(renderQuizzQuestions);
    
}

let position = 0;

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
            <div class="question question${[i]}"> 
                <div class="questionContent">
                    <div class="header">
                        <div class="topo" style = background-color:${questions[i].color}>
                            ${questions[i].title}
                        </div>
                    </div>
                    <div class="answersList unpassed answers-${i} ${i}">
                    </div>
                </div>
            </div>
        </div> 
         `
        renderAnswers(answers, i);
    }
    teste = quizz;
}     
let teste;
function randomNumber() {
    return Math.random() - 0.5;
}

function onclickAnswer(answer, isCorrect, tamanho, lista) {
    answer.classList.add("choosed");
    if (isCorrect == true) {
        answer.classList.add("correct");
    }
    const pai = document.querySelector(`.answers-${lista}`);
    console.log(pai);
    let y = 400;
    for (let i = 1; i <= tamanho; i++) {
        let filho = pai.querySelector(".option" + i)
        if (!filho.classList.contains("choosed")) {
            filho.classList.add("unselected")
        }

        if (filho.classList.contains("true")) {
            filho.classList.add("correct");
        }
        else if (filho.classList.contains("false")) {
            filho.classList.add("wrong");
        }
        if (filho.classList.contains("choosed") && filho.classList.contains("true")){
            console.log("você acertou");
            
            correctAnswers++;
            console.log(correctAnswers);
        }
        pai.classList.remove("unpassed");
        console.log(pai);
        filho.removeAttribute("onclick");
    
    } 

    let a = document.querySelector(`.answers-${lista + 1}`);
    if (a === null) {
        console.log("asgadhdfhhdfhahdfh");
        renderResult(teste);
    }
}

function scrollToQuestion(question, i) {
    let coordinates = question.getBoundingClientRect();
    let next = document.querySelector(`.answers-${i + 1}`);
    console.log(coordinates);
    let nextCoordinates = next.getBoundingClientRect();
    console.log(nextCoordinates);
    window.scrollTo(nextCoordinates.x, nextCoordinates.y);
}


function renderAnswers(answers, x ){
    
    const tag = document.querySelector(`.answers-${x}`);
    answers.sort(randomNumber);
    for (let i = 0; i < answers.length; i++) {
        tag.innerHTML += `
        <div class ="answerOption option${i + 1} ${answers[i].isCorrectAnswer} " onclick="onclickAnswer(this, ${answers[i].isCorrectAnswer}, ${answers.length}, ${x})">
            <img src="${answers[i].image}">
            <text class="texto">${answers[i].text}</text>
        </div>
        `
    }
} 

function resetQuizz() {
    let id = position;
    let promise = axios.get(`${API}/${id}`)
    promise.then(renderQuizzQuestions);
}

function renderResult(quizz) {
    let tag = document.querySelector(".especificQuizz");
    let pontuacao = Math.round((correctAnswers / quizz.questions.length * 100).toFixed(2));
    let level = quizz.levels;

    let title = "";
    let image;
    let text = "";
    for (let i = 0; i < level.length; i++) {
        if (level[i+1] == null) {
            if(pontuacao >= level[i].minValue) {
            title = level[i].title;
            image = level[i].image;
            text = level[i].text;
            }
        }
        else if (pontuacao >= level[i].minValue && pontuacao >= level[i+1].minValue) {
            title = level[i+1].title;
            image = level[i+1].image;
            text = level[i+1].text;
        }
        else if (pontuacao >= level[i].minValue && pontuacao) {
            title = level[i].title;
            image = level[i].image;
            text = level[i].text;
        }
        
        
    }
    tag.innerHTML += `
        <div class="container">
            <div class="question">
                <div class="questionContent">
                    <div class="header">
                        <div class="topo" style = background-color:red>
                            ${pontuacao}% de acertos. ${title}
                        </div> 
                    </div>
                    <div class="box">
                        <img class="pictureResult" src="${image}"> 
                        <div class="texto" >
                        ${text}
                        </div>
                    </div>      
                        
                </div>
           
            </div>
            <div class="button" onclick="resetQuizz()">
                <div class="content">
                    <h3>Reiniciar Quizz</h3>
                </div>
            </div>
            <div class="homeButton" onclick="changeScreen('especificQuizz', 'initialScreen')">
                <h4>
                    Voltar pra home
                </h4>
            </div>
        </div>
        
    `;


}

function changeScreen(a, b) {
    let tag = document.querySelector("." + a);
    tag.classList.add("hidden");
    document.querySelector("." + b).classList.remove("hidden");
    window.scrollTo(400,0);
}

getQuizzes();

