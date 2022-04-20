function getQuizzes() {
   let promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
   promise.then(console.log(promise));
}

getQuizzes();

