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
const maxCliffPosition = 10;  // Maximum distance from the edge

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
            cliffPosition++;  // Step away from the edge (max limit)
        }
    } else {
        resultText += "💀 You lost this round!";
        aiScore++;
        cliffPosition--;  // Step closer to the edge
    }

    // Update Display
    document.getElementById("result").innerText = resultText;
    document.getElementById("score").innerText = `Score - You: ${playerScore} | AI: ${aiScore}`;
    document.getElementById("cliff").innerText = `🧍 You are ${cliffPosition} steps from the edge.`;

    // Check if Player Falls Off the Cliff
    if (cliffPosition === 0) {
        document.getElementById("result").innerText = "😱 You slipped and fell off the cliff! Game over.";
        document.getElementById("game").innerHTML = "<p>Refresh to play again.</p>";
    }
}