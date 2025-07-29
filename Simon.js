var buttons = document.querySelectorAll(".button");
var gameContainer = document.getElementById("game-container");
var startButton = document.getElementById("start-button");
var levelDisplay = document.getElementById("level");

startButton.addEventListener("click", ()=>{
    startButton.style.display = "none";
    startgame();
});
// Store the sequence and user progress
let sequence = [];
let userStep = 0;

function startgame() {
    // If starting a new game, reset sequence and level
    if (levelDisplay.textContent === "0") {
        sequence = [];
    }
    // Add a new random button to the sequence
    var randomIndex = Math.floor(Math.random() * buttons.length);
    sequence.push(randomIndex);
    userStep = 0;

    // Blink the sequence to the user
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
    window.currentSequence = sequence; // Store globally if needed elsewhere
    window.userStep = userStep;
}
buttons.forEach((button, id) => {
    button.addEventListener("click", () => {
        // Only proceed if the game is running
        if (sequence.length > 0) {
            if (id === sequence[userStep]) {
                userStep++;
                if (userStep === sequence.length) {
                    // User completed the sequence
                    levelDisplay.textContent = Number(levelDisplay.textContent) + 1;
                    setTimeout(() => {
                        startgame();
                    }, 500);
                }
            } else {
                // Wrong button clicked
                levelDisplay.textContent = "0";
                alert("Wrong button! Try again.");
                startButton.style.display = "block";
                sequence = [];
                userStep = 0;
            }
        }
    });
});
