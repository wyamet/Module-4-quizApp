const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const timer = document.querySelector("#time");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeLeft = 60; // set the time for the quiz in seconds

let questions = [
  {
    question: "JavaScript is a _____. language",
    choice1: "Object oreiented",
    choice2: "Object based",
    choice3: "Procederal",
    choice4: "None of the above",
    answer: 1,
  },
  {
    question:
      "String values must be enclosed in _____ when being assigned to variables.",
    choice1: "Commas",
    choice2: "Quotes",
    choice3: "parenthesis",
    choice4: "Square Brackets",
    answer: 2,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is: ",
    choice1: "JavaScript",
    choice2: "terminal/bash",
    choice3: "console.log",
    choice4: "for loops",
    answer: 3,
  },
  {
    question: "The condition in an if / else statement is enclosed with _____.",
    choice1: "Quotes",
    choice2: "Curley Brackets",
    choice3: "Parenthesis",
    choice4: "Square Brackets",
    answer: 3,
  },
  {
    question: "Arrays in JavaScript can be used to store_____.",
    choice1: "Numbers and Strings",
    choice2: "other Arrays",
    choice3: "booleans",
    choice4: "All the Above",
    answer: 4,
  },
  {
    question: "What company developed JavaScript?",
    choice1: "Netscape",
    choice2: "Google",
    choice3: "apple",
    choice4: "Swift",
    answer: 1,
  },
  {
    question: "When was JavaScript created?",
    choice1: "1995",
    choice2: "2000",
    choice3: "2005",
    choice4: "1999",
    answer: 1,
  },
  {
    question: "Why is JavaScript used?",
    choice1: "To make websites interactive for the user",
    choice2: "to connect servers to websites",
    choice3: "controll multi-media",
    choice4: "All the above",
    answer: 4,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 8;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  // start the timer
  let timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = `Time left: ${timeLeft} seconds`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("./end.html");
    }
  }, 1000);
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    clearInterval(timerInterval);
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
      timeLeft += 5;
    } else {
      // decrease time left by 10 seconds if answer is incorrect
      timeLeft -= 10;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);

      if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        clearInterval(timerInterval);
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("./end.html");
      }

      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
