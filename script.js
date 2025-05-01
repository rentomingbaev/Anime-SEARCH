let usedQuestions = [];
let score = parseInt(localStorage.getItem("rcScore")) || 0;
document.getElementById("score").textContent = score;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function nextQuestion() {
  const difficulty = document.getElementById("difficulty").value;
  let pool = animeQuestions.filter(q => !usedQuestions.includes(q.question));
  if (difficulty !== "все") {
    pool = pool.filter(q => q.difficulty === difficulty);
  }

  if (pool.length === 0) {
    alert("Вопросы закончились!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  const question = pool[randomIndex];
  usedQuestions.push(question.question);

  document.getElementById("question").textContent = question.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  const options = [...question.options];
  shuffle(options);
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt, question.answer);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    score += 5;
    alert("Правильно! +5 RC");
  } else {
    alert("Неправильно! Было: " + correct);
  }
  localStorage.setItem("rcScore", score);
  document.getElementById("score").textContent = score;
}

function useReveal() {
  if (score < 50) {
    alert("Недостаточно RC!");
    return;
  }
  score -= 50;
  localStorage.setItem("rcScore", score);
  document.getElementById("score").textContent = score;

  const buttons = document.querySelectorAll("#options button");
  let count = 0;
  buttons.forEach(btn => {
    if (btn.textContent !== animeQuestions.find(q => q.question === document.getElementById("question").textContent).answer) {
      if (count < 2) {
        btn.disabled = true;
        count++;
      }
    }
  });
}

function toggleMusic() {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("toggle-music");
  music.muted = !music.muted;
  btn.textContent = music.muted ? "🔇 Вкл. звук" : "🔊 Выкл. звук";
}

window.onload = nextQuestion;
