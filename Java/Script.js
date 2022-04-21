function getQuizzes() {
   let promise = axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes');
   promise.then(renderQuizzes);
}


function test(promise) {
    console.log(promise.data);
}

function renderQuizzes(response) {
    let listQuizzes = document.querySelector("ul");
    let quizzes = response.data;
    console.log(quizzes);
    for(let i = 0; i < quizzes.length; i++) {
        listQuizzes.innerHTML += `
        <li onclick="changeDisplay('initialScreen')"><h3>${quizzes[i].title}</h3>
         <img class ="imagemQuizz" src="${quizzes[i].image}" alt="">
        </li>
        `
       
    }
}

function changeDisplay(parameter) {
    let tag = document.querySelector("." + parameter);
    
    if(tag.classList.contains("initialScreen")) {
        tag.classList.toggle("hidden");
        document.querySelector(".especificQuizz").classList.remove("hidden");
    }
    
}

getQuizzes();