var buttons = document.querySelectorAll(".button");
var gameContainer = document.getElementById("game-container");
var startButton = document.getElementById("start-button");
var levelDisplay = document.getElementById("level");

// 1. Map each button to a sound
var correctSound = document.getElementById("correct-sound");
var gameSound = document.getElementById("game-sound");
var wrongSound = document.getElementById("wrong-sound");


// Play game sound for each button press in sequence
// (Removed duplicate playSound function to avoid redeclaration and unused parameter error)

// Play correct sound when sequence is completed
function playCorrectSound() {
    correctSound.currentTime = 0;
    correctSound.volume = 1.0; // Set volume to maximum (100%)
    correctSound.play();
}

// Play wrong sound when user makes a mistake
function playWrongSound() {
    wrongSound.currentTime = 0;
    wrongSound.play();
}

startButton.addEventListener("click", ()=>{
    startButton.style.display = "none";
    startgame();
});
// Store the sequence and user progress
let sequence = [];
let userStep = 0;

function playSound() {
   
    gameSound.play();
}
function startgame() {
    playSound(); // Play game sound when the game starts
    if (levelDisplay.textContent === "0") {
        sequence = [];
    }
    var randomIndex = Math.floor(Math.random() * buttons.length);
    sequence.push(randomIndex);
    userStep = 0;

    let i = 0;
    function blinkNext() {
        if (i < sequence.length) {
            let btn = buttons[sequence[i]];
            let originalColor = btn.style.backgroundColor;
            btn.style.backgroundColor = "white";
            setTimeout(() => {
                btn.style.backgroundColor = originalColor;
                i++;
                setTimeout(blinkNext, 250);
            }, 500);
        }
    }
    blinkNext();
    window.currentSequence = sequence;
    window.userStep = userStep;
}
buttons.forEach((button, id) => {
    button.addEventListener("click", () => {
        if (sequence.length > 0) {
             // Play sound on click
            if (id === sequence[userStep]) {
                userStep++;
                if (userStep === sequence.length) {
                    levelDisplay.textContent = Number(levelDisplay.textContent) + 1;
                    setTimeout(() => {
                        startgame();
                        playCorrectSound() ; // Play correct sound when sequence is completed
                    }, 500);
                }
            } else {
                // Wrong button clicked
                levelDisplay.textContent = "0";
                alert("Wrong button! Try again.");
                playWrongSound(); // Play wrong sound when user makes a mistake
                startButton.style.display = "block";
                sequence = [];
                userStep = 0;
            }
        }
    });
});
