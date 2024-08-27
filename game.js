
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).on("keypress",function(){
    if (!started) {
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});



function nextSequence(){
    var randomNumber  = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("#level-title").text("level "+level);
    userClickedPattern = [];
 
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}



$(".btn").on("click",function(){
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
audio.play();

}

function animatePress(currentColour){
        $("#"+currentColour).addClass("pressed");
        setTimeout( function(){
            $("#"+currentColour).removeClass("pressed");
        },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("succes");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        over();
        startOver();
    
    }

}

function over(){
    var audio = new Audio("./sounds/wrong.mp3");
audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
}
