const questionsArr = [
  {
    question: "What is the fastest land animal?",
    options: ["Cheetah", "Horse", "Leopard", "Lion"],
    correctAns: 0,
  },
  {
    question: "Which animal is known as the 'Ship of the Desert'?",
    options: ["Camel", "Horse", "Donkey", "Elephant"],
    correctAns: 0,
  },
  {
    question: "Which bird is the largest in the world?",
    options: ["Eagle", "Ostrich", "Emu", "Albatross"],
    correctAns: 1,
  },
  {
    question: "What is the only mammal capable of true flight?",
    options: ["Flying Squirrel", "Bat", "Sugar Glider", "Hummingbird"],
    correctAns: 1,
  },
  {
    question: "Which sea creature has three hearts?",
    options: ["Octopus", "Shark", "Dolphin", "Whale"],
    correctAns: 0,
  },
];

const totalQuestions = questionsArr.length;
const html = document.documentElement;
const toggle = document.getElementById("darkToggle");
const startBtn = document.getElementById("startBtn");
const homeScreen = document.getElementById("homescreen");
const mcqsScreen = document.getElementById("mcqsscreen");
const optionsList = document.getElementById("optionslist");
const questionTitle = document.getElementById("questiontitle");
const totalQuestionsElem = document.getElementById("totalquestions");
const prevBtn = document.getElementById("prevbtn");
const nextBtn = document.getElementById("nextbtn");
const submitBtn = document.getElementById("submitbtn");
const questionNumElem = document.getElementsByClassName("question-number");
const progressElem = document.getElementById("progress");
const orders = ["a", "b", "c", "d"];
let currentQuestionIndex = 0;
function toggleTheme() {
  html.classList.toggle("dark");
}

function startQuiz() {
  homeScreen.classList.add("hidden");
  mcqsScreen.classList.remove("hidden");
  totalQuestionsElem.innerHTML = totalQuestions;
  loadQuestion();
}

function loadQuestion() {
  const per = ((currentQuestionIndex + 1) / totalQuestions) * 100 + "%";
  progress.style.width = per;
  for (let tag of questionNumElem) {
    tag.innerHTML = currentQuestionIndex + 1;
  }
  const currentQuestion = questionsArr[currentQuestionIndex];
  questionTitle.innerHTML = currentQuestion.question;
  optionsList.innerHTML = "";
  currentQuestion.options.forEach(function (opt, idx) {
    optionsList.innerHTML += `
      <li class="flex gap-3 items-center border-2 border-gray-300 px-2 py-4 hover:border-blue-700 cursor-pointer bg-gray-100 rounded-lg duration-400">
      <p class="h-5 w-5 text-sm flex justify-center items-center rounded-full border">${orders[idx]})</p>${opt}</li>
      `;
  });
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
  if (nextBtn.classList.contains("hidden")) {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
}

function nextQuestion() {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
  if (currentQuestionIndex == totalQuestions - 1) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  }
}

prevBtn.onclick = prevQuestion;
nextBtn.onclick = nextQuestion;
startBtn.onclick = startQuiz;
toggle.onchange = toggleTheme;

//for of loop
// for (let item of array) {
// console.log(item)
// }

// forEach loop
// function loop(item,index,arry) {
// console.log(item,index,arry)
// }
// array.forEach(loop);
