const screens = document.querySelectorAll(".screen");
const noBtn = document.getElementById("noBtn");
const tease = document.getElementById("tease");

let questionIndex = 0;

const questions = [
  {
    q: "What makes a day better? 🌸",
    answers: ["Me💌", "Churail", "Night Mare", "All of these 😌"],
    correct: 3
  },
  {
    q: "What should we collect together? ✨",
    answers: ["Memories 📸", "Bills 😭", "Arguments 🙈", "Nothing"],
    correct: 0
  },
  {
    q: "Choose our perfect vibe. 💗",
    answers: ["Novel talks 🌙", "Random adventures 🧸", "Laughing at nonsense 😂", "All of the above 💕"],
    correct: 3
  },
  {
    q: "And finally... will you stay? 🥹",
    answers: ["Yes 💗", "Of course 💕", "Obviously 😭", "ALL YES"],
    correct: 3
  }
];

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "quiz") {
    loadQuestion();
  }
}

function sayYes() {
  showScreen("yesScreen");
  burstHearts();
}

function moveNo() {
  const messages = [
    "Nice try 😭",
    "O you Mean YessS",
    "Are you sure? 🥺",
    "Try the other one 💗"
  ];

  tease.textContent = messages[Math.floor(Math.random() * messages.length)];

  const maxX = Math.min(110, window.innerWidth * .18);
  const maxY = 55;

  noBtn.style.transform =
    `translate(${(Math.random() * 2 - 1) * maxX}px, ${(Math.random() * 2 - 1) * maxY}px)`;
}

function loadQuestion() {
  const item = questions[questionIndex];

  document.getElementById("questionNo").textContent =
    `Question ${questionIndex + 1} of ${questions.length}`;

  document.getElementById("question").textContent = item.q;

  const answers = document.getElementById("answers");
  const msg = document.getElementById("quizMsg");

  msg.textContent = "";
  answers.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.onclick = () => checkAnswer(index);
    answers.appendChild(button);
  });
}

function checkAnswer(index) {
  const item = questions[questionIndex];
  const msg = document.getElementById("quizMsg");

  if (index !== item.correct) {
    msg.textContent = "Hmm... think again 🥺💗";
    return;
  }

  questionIndex++;

  if (questionIndex >= questions.length) {
    questionIndex = 0;
    setTimeout(() => showScreen("letter"), 450);
  } else {
    msg.textContent = "Correct! ✨";
    setTimeout(loadQuestion, 500);
  }
}

function burstHearts() {
  for (let i = 0; i < 16; i++) {
    const heart = document.createElement("div");
    heart.textContent = ["♥", "♡", "💗", "💕"][Math.floor(Math.random() * 4)];
    heart.style.position = "fixed";
    heart.style.left = (45 + Math.random() * 10) + "%";
    heart.style.top = (45 + Math.random() * 10) + "%";
    heart.style.fontSize = (16 + Math.random() * 22) + "px";
    heart.style.color = "#c63f6e";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "20";

    document.body.appendChild(heart);

    const x = (Math.random() - .5) * 320;
    const y = -(80 + Math.random() * 260);

    heart.animate(
      [
        { transform: "translate(0,0) scale(.5)", opacity: 1 },
        { transform: `translate(${x}px,${y}px) scale(1.2)`, opacity: 0 }
      ],
      { duration: 1300, easing: "ease-out" }
    ).onfinish = () => heart.remove();
  }
}
