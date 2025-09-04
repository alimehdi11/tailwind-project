// Array of quiz questions
const questionsArr = [
  {
    question: "What is the fastest land animal?",
    options: ["Cheetah", "Horse", "Leopard", "Lion"],
    correctAns: 0, // Index of correct answer
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

// Quiz metadata
const totalQuestions = questionsArr.length;
const orders = ["a", "b", "c", "d"]; // For labeling options

// DOM elements

// 🌙 Theme / General
const html = document.documentElement;
const toggle = document.getElementById("darkToggle");

// 🏠 Screens
const homeScreen = document.getElementById("homescreen");
const mcqsScreen = document.getElementById("mcqsscreen");
const resultScreen = document.getElementById("resultscreen");

// 🎮 Buttons
const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevbtn");
const nextBtn = document.getElementById("nextbtn");
const submitBtn = document.getElementById("submitbtn");
const againBtn = document.getElementById("again");

// ❓ Quiz UI
const questionTitle = document.getElementById("questiontitle");
const optionsList = document.getElementById("optionslist");
const questionNumElem = document.getElementsByClassName("question-number");
const totalQuestionsElem = document.getElementById("totalquestions");
const progressElem = document.getElementById("progress");

// 🏆 Result UI
const quizAnswers = document.getElementById("quiz-answers");
const scoreElem = document.getElementById("score");

// ------------------- State -------------------
let userAnswers = Array(totalQuestions).fill(null);
let currentQuestionIndex = 0;

// ------------------- Functions -------------------

// Toggle dark/light theme
function toggleTheme() {
  html.classList.toggle("dark");
}

// Start quiz
function startQuiz() {
  homeScreen.classList.add("hidden");
  mcqsScreen.classList.remove("hidden");
  totalQuestionsElem.innerHTML = totalQuestions;
  loadQuestion(); // Load first question
}

// Restart quiz
function again() {
  homeScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");

  currentQuestionIndex = 0;
  userAnswers = Array(totalQuestions).fill(null);

  // Reset buttons
  nextBtn.classList.remove("hidden");
  submitBtn.classList.add("hidden");
}

// Select an answer
function selectAns(ans) {
  userAnswers[currentQuestionIndex] = ans;

  const selectLi = optionsList.children[ans];

  // Remove previous selection styling
  for (let li of optionsList.children) {
    if (li.classList.contains("border-blue-700")) {
      li.classList.add("border-gray-300");
      li.classList.remove("border-blue-700");
    }
  }

  // Highlight selected option
  selectLi.classList.remove("border-gray-300");
  selectLi.classList.add("border-blue-700");
}

// Load current question
function loadQuestion() {
  // Update progress bar
  const per = ((currentQuestionIndex + 1) / totalQuestions) * 100 + "%";
  progress.style.width = per;

  // Update question number
  for (let tag of questionNumElem) {
    tag.innerHTML = currentQuestionIndex + 1;
  }

  // Load question data
  const currentQuestion = questionsArr[currentQuestionIndex];
  questionTitle.innerHTML = currentQuestion.question;
  optionsList.innerHTML = "";

  // Render options
  currentQuestion.options.forEach(function (opt, idx) {
    optionsList.innerHTML += `
      <li onclick="selectAns(${idx})"
          class="flex gap-3 items-center border-2 border-gray-300 px-2 py-4
                 hover:border-blue-700 cursor-pointer bg-gray-100 rounded-lg duration-400">
        <p class="h-5 w-5 text-sm flex justify-center items-center rounded-full border">
          ${orders[idx]})
        </p>
        ${opt}
      </li>
    `;
  });
}

// Load previous question
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }

  // Show next button again if submit was visible
  if (nextBtn.classList.contains("hidden")) {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
}

// Load next question
function nextQuestion() {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }

  // If it's the last question, show submit button
  if (currentQuestionIndex == totalQuestions - 1) {
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  }
}

// Submit quiz and show results
function submitQuiz() {
  mcqsScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let score = 0;
  quizAnswers.innerHTML = "";

  // Calculate score and render answers
  questionsArr.forEach(function (q, idx) {
    if (q.correctAns == userAnswers[idx]) {
      score++;
    }

    quizAnswers.innerHTML += `
      <div class="p-5 rounded-md space-y-3">
        <h1 class=" text-lg">Question ${idx + 1}: ${q.question}</h1>
        <p class="text-gray-600">
          Your Answer: ${q.options[userAnswers[idx]] ?? "Not Answered"}
        </p>
        <p class="text-green-600">
          Correct Answer: ${q.options[q.correctAns]}
        </p>
      </div>
    `;
  });

  scoreElem.innerHTML = `${score}/${totalQuestions}`;
}

// ------------------- Event Listeners -------------------
againBtn.onclick = again;
prevBtn.onclick = prevQuestion;
nextBtn.onclick = nextQuestion;
startBtn.onclick = startQuiz;
submitBtn.onclick = submitQuiz;
toggle.onchange = toggleTheme;

// ------------------- Notes -------------------
// Example of for...of loop
// for (let item of array) {
//   console.log(item);
// }

// Example of forEach loop
// array.forEach((item, index, arr) => {
//   console.log(item, index, arr);
// });
