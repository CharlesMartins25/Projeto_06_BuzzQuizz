const segundos = 1000;
let novoQuizz = {
    title: "",
    imagem: "",
    questoes: [],
    niveis: [],
}

const errorTitle = "O titulo deve ter entre 20 e 60 caracteres"

const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";


//Página inicial de criação do quizz!!
const botAdd = () => {
    let page = document.querySelector(".criacaoQuizz");
   page.innerHTML =
   `
    <h4> Comece pelo começo </h4>
   <div class="quizzGeral">
  <div class="titleQuizz" >
  <input class="boxQuizz tituloQuizz" name="title" type="text" placeholder="Titulo do seu quizz">
  <span class="textoError hidden">O título do quizz deve ter entre 20 e 60 caracteres</span>
  </div>
  <div class="imageUrl">
 <input class="boxQuizz valorImg" name="title" type="text" placeholder="URL da imagem do seu quizz">
 <span class="textoError textoErrorImg hidden">A URL não é válida</span>
  </div>
  <div class="questionQtd">
  <input class="boxQuizz perguntasQuizz" name="title" type="number" placeholder="Quantidade de perguntas do seu quizz">
  <span class="textoError textoErrorQues hidden">O quizz deve ter no minimo 3 perguntas</span>
  </div>
  <div class="levelsQtd">
  <input class="boxQuizz niveisQuizz" name="title" type="number" placeholder="Quantidades de níveis do seu quizz">
  <span class="textoError textoErrorLevels hidden">O quizz deve ter no minimo 2 níveis</span>
  </div>
   </div>
   <button onclick="condicoesError()" class="botaoPag1Quizz">
   Prosseguir para criar perguntas
   </button>`

   
}


const condicoesError = () => {
let titleIni = "";
let imgUrl = "";
let questionsValor = "";
let levelsValor = "";
    let title = document.querySelector(".tituloQuizz").value;
    
    if(title.length > 20 && title.length < 60){
      titleIni = false
     
    }
    else {const errorBa = document.querySelector('.textoError');
    errorBa.classList.remove("hidden")} 
    

    
    const testUrl = "https://";
    let valueUrl = document.querySelector(".valorImg").value;
    

    if (valueUrl.startsWith(testUrl)){
     imgUrl = false
       
    }
    else{
        const errorUrl = document.querySelector('.textoErrorImg');
 errorUrl.classList.remove("hidden")
    }


 let questions = document.querySelector(".perguntasQuizz").value;
  if (questions >= 3 && questions <= 15){
      questionsValor = false
    
 }
 else {const errorQuest = document.querySelector('.textoErrorQues');
 errorQuest.classList.remove("hidden")
}

let levels = document.querySelector(".niveisQuizz").value;
if (levels >= 2 && levels <= 10 ){
  levelsValor = false
   
}
else {
    const errorLevels = document.querySelector(".textoErrorLevels");
    errorLevels.classList.remove("hidden")
   
}
if (titleIni === false && imgUrl === false && questionsValor === false && levelsValor === false){
    criarQuizz()
}







}






function criarQuizz(questions) {
    let inputQuestions = "";
    for (i = 1; i <= questions; i++){
        inputQuestions += `
       `
    }
    
   let testando = document.querySelector('.container')
   testando.innerHTML =  `

<div class="perguntasGeral">
  <h4> Crie suas perguntas </h4>
   <div class="perguntasOne">
 <div class="PerguntaOne" >
 <h5> Pergunta 1 </h5>
 <input class="boxQuestions tituloQuestion" name="title" type="text" placeholder="Texto da pergunta" focus>
 <span class="textoError hidden">A pergunta de ter no minimo 20 caracteres</span>
 </div>
 <div class="corDeFundoDaPergunta" >
 <input class="boxQuestions corQuestion" name="title" type="text" placeholder="Cor de fundo da pergunta" focus>
 <span class="textoError hidden">A cor deve ter o modelo hexadecimal</span>
 </div>
 <h5> Resposta correta </h5>
 <div class="repostaCorreta" >
 <input class="boxQuestions respostaQuestion" name="title" type="text" placeholder="Resposta correta" focus>
 <span class="textoError hidden">Texto da resposta não pode ser vazio</span>
 <div class="urlImage">
 <input class="boxQuestions respostaQuestion" name="title" type="text" placeholder="URL da imagem" focus>
 <span class="textoError hidden">A URL não é válida</span>
 </div>
 </div>
 <h5> Respostas incorretas </h5>
 <div class="repostaIncorreta1" >
 <input class="boxQuestions respostaQuestion" name="title" type="text" placeholder="Resposta incorreta 1" focus>
 <span class="textoError hidden">Texto da resposta não pode ser vazio</span>
 <div class="urlImageIncorreta1">
 <input class="boxQuestions respostaQuestion" name="title" type="text" placeholder="URL da imagem 1" focus>
 <span class="textoError hidden">A URL não é válida</span>
 </div>
 <div class="repostaIncorreta2" >
 <input class="boxQuestions respostaQuestion" name="title" type="text" placeholder="Resposta incorreta 2" focus>
 <span class="textoError hidden">Texto da resposta não pode ser vazio</span>
 <div class="urlImageIncorreta2">
 <input class="boxQuestions respostaQuestion" name="title" type="text" placeholder="URL da imagem 2" focus>
 <span class="textoError hidden">A URL não é válida</span>
 </div>
 <div class="repostaIncorreta3" >
 <input class="boxQuestions respostaQuestion" name="title" type="text" placeholder="Resposta incorreta 3" focus>
 <span class="textoError hidden">Texto da resposta não pode ser vazio</span>
 <div class="urlImageIncorreta1">
 <input class="boxQuestions respostaQuestion" name="title" type="text" placeholder="URL da imagem 3" focus>
 <span class="textoError hidden">A URL não é válida</span>
 </div>
 </div>
 
  </div>
  </li>
  <button onclick="condicoesError()" class="botaoPag1Quizz">
  Prosseguir para criar perguntas
  </button>`
  
}


const criacaoNiveis = (questoes) => {

let novaVida = document.querySelector("container");
novaVida.innerHTML = `<div class"CriaN"
<h2>Que mundo cruel>`
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
        <li id="${quizzes[i].id}" onclick=changeScreen('initialScreen','especificQuizz');getQuizz(this.getAttribute("id"))><h3>${quizzes[i].title}</h3>
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
    let questions = quizz.questions;
    console.log(questions);
    let choosedQuestions = [];
    let tag = document.querySelector(".especificQuizz");
    tag.innerHTML += `
    <div class="banner">
        <img src="${quizz.image}" alt=""  width="100%" height="227">
        <h1>${quizz.title}</h1>
    </div>
    `
    for (let i = 0; i < questions.length; i++ ) {

        num = getRandomInt(0, questions.length);
        
        console.log("numero:" + num)

        while (choosedQuestions.includes(num)) {
            num = getRandomInt(0, questions.length);
        }
        choosedQuestions.push(num);
        console.log(choosedQuestions);
        tag.innerHTML += `
        <div class="container"> 
            <div class="question"> 
                <div class="topo" >
                    ${questions[i].title}
                </div>
                <div>
                    fgfgsdgsdh
                </div>

            </div>

        </div> 
         `
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function changeScreen(a, b) {
    let tag = document.querySelector("." + a);
    tag.classList.add("hidden");
    document.querySelector("." + b).classList.remove("hidden");
}
getQuizzes();


