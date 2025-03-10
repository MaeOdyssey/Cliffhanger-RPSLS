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
let cliffPosition = 5;  // Spock starts in the middle
const minCliffPosition = 0;  // Falls off the cliff
const maxCliffPosition = 11; // Safe distance
const spockElement = document.getElementById("spock");

// Function to Play the Game
function playGame(playerChoice) {
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];
    
    let resultText = `You chose ${playerChoice}. AI chose ${aiChoice}. `;

    if (playerChoice === aiChoice) {
        resultText += "It's a tie! ⚖️ Spock remains confused!";
    } else if (rules[playerChoice].includes(aiChoice)) {
        resultText += "🎉 You win this round! Spock hesitates and moves away!";
        playerScore++;
        if (cliffPosition < maxCliffPosition) { 
            cliffPosition++;  // Step away from the edge
        }
    } else {
        resultText += "💀 You lost this round! Spock continues walking toward the cliff!";
        aiScore++;
        cliffPosition--;  // Step closer to the edge
    }

    // Move Spock
    updateSpockPosition();

    // Check if Spock Falls Off the Cliff
    if (cliffPosition === minCliffPosition) {
        document.getElementById("result").innerText = "😱 Spock falls! The Prime Directive has been violated!";
        document.getElementById("game").innerHTML = "<p>Refresh to try again.</p>";
    }

    // Check if Spock Escapes
    if (cliffPosition === maxCliffPosition) {
        document.getElementById("result").innerText = "🖖 Spock regains control! 'Fascinating. Your logic has freed me from this peril.'";
        document.getElementById("game").innerHTML = "<p>Refresh to play again.</p>";
    }
}

// Function to Move Spock Visually
function updateSpockPosition() {
    // Calculate Spock's position (from left to right)
    const percentage = (cliffPosition / maxCliffPosition) * 80; // Adjust this range as needed
    spockElement.style.left = percentage + "%";
}