var startButton = document.getElementById('start-btn')
var questionContainerElement = document.getElementById('question-container')
var welcomeMessage = document.getElementById('game-welcome')
var shuffledQuestions, currentQuestionIndex
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var nextButton = document.getElementById('next-btn')
var finishButton = document.getElementById('finish-btn')
var resultDisplay = document.getElementById('result')


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame(){
  console.log('Started')
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0 
  questionContainerElement.classList.remove('hide')
  welcomeMessage.style.visibility = 'hidden';
  highscoresSpan.classList.add('hide')
  submitIdButton.classList.add('hide')
  setNextQuestion()
}

function setNextQuestion(){
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
  questionElement.innerText = question.question
  question.answers.forEach(answer =>{
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button);
  })
}

function resetState(){
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while(answerButtonsElement.firstChild){
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e){
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button =>{
    setStatusClass(button, button.dataset.correct)
    if (correct){
      resultDisplay.textContent = 'You were correct!'
    }else{
      resultDisplay.textContent = 'You were incorrect'
    }
  })
  resultDisplay.classList.remove('hide')
  if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hide')
  }else{
    finishButton.addEventListener('click', detailEntry)
    finishButton.classList.remove('hide')

  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if(correct){
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element){
  resultDisplay.textContent = ''
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var questions = [
  {
    question: "Commonly used data types DO NOT include",
    answers: [
      {text: 'strings', correct: true},
      {text: 'booleans', correct: false},
      {text: 'numbers', correct: false},
      {text: 'alerts', correct: false},
    ]
  },
  {
    question: "The condition in an if/else statement is enclosed within ___.",
    answers: [
      {text: 'quotes', correct: true},
      {text: 'curly brackets', correct: false},
      {text: 'parentheses', correct: false},
      {text: 'square brackets', correct: false},
    ]
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: [
      {text: 'Angular', correct: true},
      {text: 'jQuery', correct: true},
      {text: 'RequireJS', correct: false},
      {text: 'ESLint', correct: false},
    ]
  }

]

//User detail storage
var idInput = document.querySelector("#initials");
var userIdSpan = document.querySelector("#user-id");
var highscoresSpan = document.getElementById("highscores");
var submitIdButton = document.getElementById("id-btn");

renderLastRegistered();

function detailEntry(){
  startButton.innerText = 'Restart Game'
  startButton.classList.remove('hide')
  questionContainerElement.classList.add('hide')
  finishButton.classList.add('hide')
  highscoresSpan.classList.remove('hide')
  submitIdButton.classList.remove('hide')
  



  startButton.innerText = 'Restart Game'
  startButton.classList.remove('hide')
}

function renderLastRegistered() {
  var id = localStorage.getItem("id");

  if (!id) {
    return;
  }

  userIdSpan.textContent = id;
}