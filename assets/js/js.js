// This code will run as soon as the page loads
window.onload = function () {
  $("#game").html('<button class="btn btn-warning" id="start">Start</button>');
  $("#start").on("click", start);
};

var timer;
var time = 30;
var timeout;
var questionNumber = 0;
var questionsSection = $("<div>").attr("id", "questions");
var correctAnswers = 0;
var incorrectAnswers = 0;
var notAnswerd = 0;


function start() {

  $(".jumbotron").removeClass("text-center");
  timer = setInterval(count, 1000);

  $("#game").html(
    "<h4 style='float:right'>Time left: <span id='time' style='color:red;'>30</span></h4>"
  );
  $("#game").append(questionsSection);
  loadQuestion();
};

function loadQuestion() {
  questionsSection.html("<p>Question:<br>" + "<b>" + questions[questionNumber].question) + "</b></p>";

  for (var i = 0; i < questions[i].answers.length; i++) {
    questionsSection.append("<button class='btn btn-success' data-name='" + questions[questionNumber].answers[i]
      + "'>" + questions[questionNumber].answers[i] + "</button>");
  }

  $("button").on("click", function () {

    if ($(this).attr("data-name") === questions[questionNumber].correctAnswer) {
      correctAnswers++;
      $("#game").prepend("<h2>");
      $("h2").addClass("text").text("You Rock!");
      timeout = setTimeout(nextQuestion, 3000);
    }
    else {
      incorrectAnswers++;
      $("#game").prepend("<h2>");
      $("h2").addClass("text").text("You Lose!");
      timeout = setTimeout(nextQuestion, 3000);
    }

  });


};
function nextQuestion() {

  questionNumber++;
  if (questionNumber > questions.length - 1) {
    setTimeout(result(), 2000);
  }
  else {
    clearInterval(timer);
    clearTimeout(timeout);
    start();
    time = 30;
  }
};

function count() {

  time--;
  $("#time").text(time);
  if (time === 0) {
    time = 30;
    $("#time").text(time);
    clearInterval(timer);
    nextQuestion();
    notAnswerd++;
  }
}

function result() {
  clearTimeout(timeout);
  clearInterval(timer);
  time = 30;
  $("#time").text(time);

  $("#game").html("<h4 style='float:right'>Time left: <span id='time' style='color:red;'>30</span></h4><h2>All done, heres your results!</h2>");
  $("#game").append("<h3>Correct Answers: " + correctAnswers + "</h3>");
  $("#game").append("<h3>Incorrect Answers: " + incorrectAnswers + "</h3>");
  $("#game").append("<h3>Unanswered: " + notAnswerd + "</h3>");
  $("#game").append("<br><button class='btn btn-warning' id='start-over'>Start Over?</button>");

  $("#start-over").on("click", function () {
    $(".jumbotron").addClass("text-center");
    $("#game").html('<button class="btn btn-warning" id="start">Start</button>');
    $("#start").on("click", start);
    questionNumber = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    notAnswerd = 0;
  });

}

// Questions
var questions = [{
  question: "Which of the following is a single global function defined in the jQuery library?",
  answers: ["jQuery()", "$()", "Queryanalysis()", "global()"],
  correctAnswer: "$()"
}, {
  question: "Which of the following is an equivalent replacement of $(document).ready(f)?",
  answers: ["jQuery(f)", "$(f)", "#(f)", "read(f)"],
  correctAnswer: "$(f)"
}, {
  question: "Which of the following is correct?",
  answers: ["jQuery is a JavaScript Library", "jQuery is a JSON Library", "jQuery is not a Library", "jQuery is an advanced JavaScript"],
  correctAnswer: "jQuery is a JavaScript Library"
}, {
  question: "Which sign does jQuery use as a shortcut for jQuery?",
  answers: ["the $ sign", "the % sign", "the & sign", "the ? sign"],
  correctAnswer: "the $ sign"
}, {
  question: "What year JQuery released?",
  answers: ["2000", "2004", "2006", "2010"],
  correctAnswer: "2006"
}];