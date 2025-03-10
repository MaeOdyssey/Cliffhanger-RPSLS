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
    animateSpockPosition();

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

// Function to Animate Spock's Movement Smoothly
function animateSpockPosition() {
    const targetPosition = (100 - ((cliffPosition / maxCliffPosition) * 80)); // Invert for right-side movement
    
    function step() {
        let currentPosition = parseFloat(window.getComputedStyle(spockElement).right) || 50;
        let speed = 2; // Movement speed per frame
        if (Math.abs(currentPosition - targetPosition) < speed) {
            spockElement.style.right = targetPosition + "%";
            return; // Stop animation when close enough
        }
        spockElement.style.right = (currentPosition + (targetPosition > currentPosition ? speed : -speed)) + "%";
        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}