// RPSLS Choices
const choices = ["rock", "paper", "scissors", "lizard", "spock"];

// Rules Dictionary (who each choice beats)
const rules = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper"],
    spock: ["scissors", "rock"]
};

// Game State
let playerScore = 0;
let aiScore = 0;
let cliffPosition = 5;  // Player starts 5 steps from the edge
const minCliffPosition = 0;  // Falling off the cliff
const maxCliffPosition = 11; // Escaping successfully

// Function to Play the Game
function playGame(playerChoice) {
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];
    
    let resultText = `You chose ${playerChoice}. AI chose ${aiChoice}. `;

    if (playerChoice === aiChoice) {
        resultText += "It's a tie! ⚖️";
    } else if (rules[playerChoice].includes(aiChoice)) {
        resultText += "🎉 You win this round!";
        playerScore++;
        if (cliffPosition < maxCliffPosition) { 
            cliffPosition++;  // Step away from the edge
        }
    } else {
        resultText += "💀 You lost this round!";
        aiScore++;
        cliffPosition--;  // Step closer to the edge
    }

    // Update Cliff Bar
    updateCliffUI();

    // Check if Player Falls Off the Cliff
    if (cliffPosition === minCliffPosition) {
        document.getElementById("result").innerText = "😱 You slipped and fell off the cliff! Game over.";
        document.getElementById("game").innerHTML = "<p>Refresh to play again.</p>";
    }

    // Check if Player Successfully Escapes
    if (cliffPosition === maxCliffPosition) {
        document.getElementById("result").innerText = "🖖 Fascinating. You have successfully moonwalked away from danger. Live long and prosper!";
        document.getElementById("game").innerHTML = "<p>Refresh to play again.</p>";
    }
}

// Function to Update Cliff UI
function updateCliffUI() {
    const cliffBar = document.getElementById("cliff-progress");
    const cliffText = document.getElementById("cliff-text");

    // Update text
    cliffText.innerText = cliffPosition;

    // Update bar width (scale between 0% and 100%)
    const percentage = (cliffPosition / maxCliffPosition) * 100;
    cliffBar.style.width = percentage + "%";
}
