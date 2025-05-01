let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(option));
    li.appendChild(button);
    optionsElement.appendChild(li);
  });
}

function selectAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    score++;
    alert("Правильно!");
  } else {
    alert(`Неправильно! Правильный ответ: ${currentQuestion.answer}`);
  }
  scoreElement.textContent = `Счёт: ${score}`;
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    alert(`Игра окончена! Ваш счёт: ${score} из ${questions.length}`);
    // Сброс игры
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Счёт: ${score}`;
    showQuestion();
  }
}

nextButton.addEventListener("click", showQuestion);

// Начать игру
showQuestion();
