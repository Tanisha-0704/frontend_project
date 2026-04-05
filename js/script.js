let questions = [
     {
    question: "What is the name of your project?",
    options: ["Quiz Question with Revision", "Travel webpage", "facebook website", "none of these"],
    answer: "Quiz Question with Revision",
    explanation: "Because with the help of this project it will easy to revise your weak topic."
  },
  {
    question: "What is HTML?",
    options: ["Programming Language", "Markup Language", "Database", "OS"],
    answer: "Markup Language",
    explanation: "HTML is used to structure web pages."
  },
  {
    question: "What is CSS?",
    options: ["Language", "Style Sheet", "DB", "OS"],
    answer: "Style Sheet",
    explanation: "CSS is used for styling web pages."
  },
  {
    question: "Which is JavaScript framework?",
    options: ["React", "HTML", "CSS", "SQL"],
    answer: "React",
    explanation: "React is a JavaScript library/framework."
  },
{
  question: "Which CSS property is used to change text color?",
  options: ["font-color", "text-color", "color", "bgcolor"],
  answer: "color",
  explanation: "The 'color' property is used to set the text color in CSS. It can accept values like names, HEX, RGB, or HSL."
},
{
  question: "Which keyword is used to declare a variable in JavaScript?",
  options: ["var", "int", "string", "define"],
  answer: "var",
  explanation: "The 'var' keyword is used to declare variables in JavaScript. Modern JavaScript also uses 'let' and 'const' for better scope control."
},
{
  question: "Which method is used to display output in console in JavaScript?",
  options: ["print()", "console.log()", "echo()", "write()"],
  answer: "console.log()",
  explanation: "console.log() is used to print output in the browser console. It is mainly used for debugging and testing code."
}
];

let index = 0;
let score = 0;
let wrongAnswers = [];
let selected = "";

// LOGIN
function login(){
  let name = document.getElementById("name").value;
  let uid = document.getElementById("uid").value;

  if(name === "" || uid === ""){
    alert("Please fill all fields!");
    return;
  }

  localStorage.setItem("name", name);
  localStorage.setItem("uid", uid);

  window.location = "quiz.html";
}

// LOAD QUESTION
function loadQuestion(){
  let q = questions[index];
  document.getElementById("question").innerText = q.question;

  let optionsHTML = "";
  q.options.forEach(opt => {
    optionsHTML += `<div class="option" onclick="selectOption(this, '${opt}')">${opt}</div>`;
  });

  document.getElementById("options").innerHTML = optionsHTML;
}

// SELECT OPTION
function selectOption(element, opt){
  selected = opt;

  let options = document.querySelectorAll(".option");
  options.forEach(o => o.classList.remove("selected"));

  element.classList.add("selected");
}

// NEXT QUESTION
function nextQuestion(){
  let q = questions[index];

  if(selected === ""){
    alert("Select an option!");
    return;
  }

  if(selected === q.answer){
    score++;
  } else {
    alert(" Wrong Answer!");

    wrongAnswers.push({
      question: q.question,
      your: selected,
      correct: q.answer,
      explanation: q.explanation
    });
  }

  index++;
  selected = "";

  if(index < questions.length){
    loadQuestion();
  } else {
    localStorage.setItem("score", score);
    localStorage.setItem("wrong", JSON.stringify(wrongAnswers));
    window.location = "revision.html";
  }
}

// REVISION PAGE
if(window.location.pathname.includes("revision.html")){
  let data = JSON.parse(localStorage.getItem("wrong")) || [];
  let box = document.getElementById("revisionBox");

  if(data.length === 0){
    box.innerHTML = "<p>Excellent. No wrong answers! Great job!</p>";
  }

  data.forEach(item => {
    box.innerHTML += `
      <div>
        <p><b>${item.question}</b></p>
        <p>Your Answer: ${item.your} </p>
        <p>Correct Answer: ${item.correct} </p>
        <p>${item.explanation}</p>
        <hr>
      </div>
    `;
  });
}

// RESULT PAGE
if(window.location.pathname.includes("result.html")){
  let score = localStorage.getItem("score");
  let total = questions.length;

  let percent = (score / total) * 100;

  let message = "";

  if(percent == 100){
    message = " Perfect Score! Excellent Work!";
  } else if(percent >= 75){
    message = " Great Job!";
  } else if(percent >= 50){
    message = " Good, keep practicing!";
  } else {
    message = " Needs Improvement!";
  }

  document.getElementById("score").innerText =
    `Score: ${score}/${total} (${percent.toFixed(2)}%)`;

  //  message show karne ke liye
  document.getElementById("score").innerHTML += `<br><br>${message}`;
}

// AUTO LOAD
if(window.location.pathname.includes("quiz.html")){
  loadQuestion();
}