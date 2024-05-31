var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var lost = false;

$(document).ready(function() {
  $(document).on("keypress", function() {
    if (level === 0) {
      nextSequence();
    }
  });

  $(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    $(this).addClass("pressed").fadeOut(50).fadeIn(50);
    setTimeout(function() {
        $("." + userChosenColor).removeClass("pressed");
      }, 50);
    checkAnswer(userClickedPattern.length - 1);
  });
});

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).addClass("pressed").fadeOut(150).fadeIn(150);
  setTimeout(function() {
    $("." + randomChosenColor).removeClass("pressed");
  }, 50);

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  lost = false;
}