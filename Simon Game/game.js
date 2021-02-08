var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level =0;
var started = false;

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

$(document).on('keypress',function(e) {
    if(!started){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
  }
    }
);


function nextSequence()
{
  userClickedPattern = [];
  $("h1").text("Level "+level);
  level=level+1;

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(700).fadeOut(700).fadeIn(700);
  playSound(randomChosenColour);

}
function playSound(name)
{

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

  }

function startOver()
{
  level=0;
$("h1").text("Game Over ");
setTimeout(function () {
  $("h1").text("Refresh Page to start again");
}, 1000);
setTimeout(function () {
  $("h1").text("Level "+level);
}, 3000);

  gamePattern=[];
  started=false;
}
function checkAnswer(index)
{
  var x=0;
    if(userClickedPattern[index]===gamePattern[index])
    {
      console.log("success");
      if(userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function() {
          nextSequence();
        },1000);
      }
    }
    else
    {
      console.log("Fail");
      startOver();
    }

}
