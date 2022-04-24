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
        <li id="${quizzes[i].id}" onclick=changeScreen('initialScreen','especificQuizz');getQuizz(this.getAttribute("id"))><h3>${quizzes[i].title}</h3>
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
        
        let answersOrder = [];

        for(let x = 0; x < answers.length; x++) {
           num = getRandomInt(0, answers.length);

           while (answersOrder.includes(num)) {
            num = getRandomInt(0, answers.length);
            }
           answersOrder.push(num); 
        }
        
            
        console.log("numero:" + num)

        

       
            console.log("answersOrder: " + answersOrder);
        
        tag.innerHTML += `
        <div class="container"> 
            <div class="question"> 
                <div class="topo" style = background-color:${questions[i].color}>
                    ${questions[i].title}
                </div>
                <div class="answersList">
                <div class="answer">
                    
                </div>
                </div>
            </div>
        </div> 
         `
        console.log(answersOrder);
        for(let x = 0; x < answers.length; x++) {
        
            document.querySelector(".answersList").innerHTML += `
            <div class="answer">
                <img src="${questions[i].answers[answersOrder[x]].image}">
                <div class="texto">${questions[i].answers[answersOrder[x]].text}</div> 
            </div>
            `
        }
                  
{/* <img src="${questions[i].answers[0].image}">
                    <div class="texto">${questions[i].answers[0].text}</div>  */}
    }
    // for (let x = 0; x < answers.length; x++) {
            


    //         let options = document.querySelector(".answers");
    //         options.innerHTML += `
    //             <div class="answer">
    //                 ${answers[num].text}
    //             </div>
    //         `
    //     }

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
