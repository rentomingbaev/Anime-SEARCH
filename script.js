const rcSpan = document.getElementById('rcPoints');
const music = document.getElementById('bg-music');
let currentQuestion;

// Баллы
let rc = localStorage.getItem('rcPoints') ? parseInt(localStorage.getItem('rcPoints')) : 0;
rcSpan.textContent = rc;

// Вопросы
const questions = [
  {
    text: "Парень становится Хокаге, потеряв родителей и лиса в теле.",
    answers: ["Наруто", "Блич", "Атака титанов", "Тетрадь смерти"],
    correct: "Наруто",
    difficulty: "Лёгкая"
  },
  {
    text: "Школьник находит тетрадь, убивает преступников.",
    answers: ["Токийский гуль", "Тетрадь смерти", "Евангелион", "Судьба"],
    correct: "Тетрадь смерти",
    difficulty: "Лёгкая"
  },
  {
    text: "Парень в маске, ест людей, теряет себя.",
    answers: ["Атака титанов", "Токийский гуль", "One Piece", "Судьба"],
    correct: "Токийский гуль",
    difficulty: "Средняя"
  },
  {
    text: "Бесконечный поезд, демоны и дыхания.",
    answers: ["Клинок, рассекающий демонов", "Naruto", "Блич", "Токийский гуль"],
    correct: "Клинок, рассекающий демонов",
    difficulty: "Средняя"
  },
  {
    text: "Битва разумов: террорист с маской и императорской силой.",
    answers: ["Код Гиас", "Тетрадь смерти", "Атака титанов", "Хеллсинг"],
    correct: "Код Гиас",
    difficulty: "Сложная"
  },
  {
    text: "Он стал демоном ради силы, брат охотник на демонов.",
    answers: ["Академия ведьм", "Токийский гуль", "Клинок, рассекающий демонов", "Наруто"],
    correct: "Клинок, рассекающий демонов",
    difficulty: "Хардкорная"
  }
];

// Показать вопрос
function showQuestion() {
  const q = questions[Math.floor(Math.random() * questions.length)];
  currentQuestion = q;
  document.getElementById("questionText").textContent = q.text;
  document.getElementById("difficultyLabel").textContent = "Сложность: " + q.difficulty;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  shuffleArray(q.answers).forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(answer);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(answer) {
  if (answer === currentQuestion.correct) {
    rc += 5;
    alert("Правильно! +5 RC");
  } else {
    alert("Неверно! Это было: " + currentQuestion.correct);
  }
  localStorage.setItem('rcPoints', rc);
  rcSpan.textContent = rc;
  showQuestion();
}

// Удалить два неверных
function useRevealer() {
  if (rc < 50) {
    alert("Недостаточно RC (нужно 50)");
    return;
  }
  rc -= 50;
  localStorage.setItem('rcPoints', rc);
  rcSpan.textContent = rc;

  const btns = Array.from(document.getElementById("answers").children);
  let removed = 0;
  for (let btn of btns) {
    if (btn.textContent !== currentQuestion.correct && removed < 2) {
      btn.style.display = "none";
      removed++;
    }
  }
}

// Музыка
function toggleMusic() {
  music.paused ? music.play() : music.pause();
}

// Сброс RC
function resetRCPoints() {
  if (confirm("Сбросить RC баллы?")) {
    rc = 0;
    localStorage.setItem('rcPoints', 0);
    rcSpan.textContent = 0;
  }
}

// Перемешивание
function shuffleArray(arr) {
  return arr.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Запуск
showQuestion();
