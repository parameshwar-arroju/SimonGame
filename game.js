/*
1. random color select
2. game pattern array store
3. adding random-color-button sound & flash
4. user keypress stores in userGamePattern
5. adding user-clicked-button sound & flash & .pressed class
6. checkAnswer : check userinput === gameinput
7. if true : continue incrementing levels
8. else flase : reset values and restart game
*/

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePatternColors = [];
let userPatternColors = [];
let level = 0;
let started = false;

function nextSequence() {
    userPatternColors = [];
    let randomNumber = Math.floor(Math.random()*4);
    let randomColor = buttonColours[randomNumber];
    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePatternColors.push(randomColor);
    sound(randomColor);
    level++;
    $("h1").text("Level "+level);
    console.log(gamePatternColors);
}

function sound(color){
    let audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
    
}

$(".btn").click(function(btnclick) {
    let clickedbutton = btnclick.target.id;
    userPatternColors.push(clickedbutton);
    sound(clickedbutton);
    $("."+clickedbutton).addClass("pressed");
    setTimeout(function() {
        $("."+clickedbutton).removeClass("pressed");
    },100);
    checkAnswer(userPatternColors.length-1);
    console.log(userPatternColors);
});

function checkAnswer(userItem){
    if(gamePatternColors[userItem] === userPatternColors[userItem]){
        console.log("success");
        if(gamePatternColors.length === userPatternColors.length){
            setTimeout(function() {
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        gamePatternColors = [];
        userPatternColors = [];
        level = 0;
        started = false;
        $("h1").text("GAME OVER");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            $("h1").text("Press A Key To Start");
        },1500);
    }
}

$(document).keypress(function() {
    if(!started){
        nextSequence();
        started = true;
    }
    
})