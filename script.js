// script.js
const questions = {
  easy: [
    {
      question: "Главный герой хочет стать Хокаге.",
      options: ["Bleach", "Naruto", "One Piece", "Tokyo Ghoul"],
      answer: "Naruto"
    },
    {
      question: "Мальчик становится охотником за сокровищами.",
      options: ["Naruto", "Hunter x Hunter", "Attack on Titan", "Death Note"],
      answer: "Hunter x Hunter"
    }
  ],
  medium: [
    {
      question: "Мальчик находит тетрадь смерти.",
      options: ["Blue Exorcist", "Demon Slayer", "Death Note", "My Hero Academia"],
      answer: "Death Note"
    }
  ],
  hard: [
    {
      question: "Мир, в котором человечество борется с титанами.",
      options: ["Bleach", "Attack on Titan", "Naruto", "Sword Art Online"],
      answer: "Attack on Titan"
    }
  ],
  hardcore: [
    {
      question: "ГГ становится гульем после пересадки органов.",
      options: ["Naruto", "Tokyo Ghoul", "One Piece", "Chainsaw Man"],
      answer: "Tokyo Ghoul"
    }
  ]
};

let usedQuestions = [];
let currentDifficulty = "";
let rcPoints = parseInt(localStorage.getItem("rcPoints")) || 0;
document.getElementById("rc-points").innerText = rcPoints;

function startGame(difficulty) {
  currentDifficulty = difficulty;
  usedQuestions = [];
  askQuestion();
}

function askQuestion() {
  const available = questions[currentDifficulty].filter(q => !usedQuestions.includes(q.question));
  if (available.length === 0) {
    document.getElementById("game-container").innerHTML = "<p>Вопросы закончились. Обновите страницу.</p>";
    return;
  }

  const q = available[Math.floor(Math.random() * available.length)];
  usedQuestions.push(q.question);

  const optionsHTML = q.options
    .map(opt => `<button onclick="checkAnswer('${opt}', '${q.answer}')">${opt}</button>`)
    .join("<br>");

  document.getElementById("game-container").innerHTML = `
    <p><strong>${q.question}</strong></p>
    ${optionsHTML}
  `;
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    rcPoints += 5;
    localStorage.setItem("rcPoints", rcPoints);
    document.getElementById("rc-points").innerText = rcPoints;
    alert("Правильно! +5 RC");
  } else {
    alert("Неправильно.");
  }
  askQuestion();
}

function toggleMusic() {
  const music = document.getElementById("bg-music");
  music.muted = !music.muted;
}
