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
let cliffPosition = 5;  // Spock starts 5 steps from the edge
const minCliffPosition = 0;  // Falls off the cliff
const maxCliffPosition = 11; // Safe distance

// Function to Play the Game
function playGame(playerChoice) {
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];
    
    let resultText = `You chose ${playerChoice}. AI chose ${aiChoice}. `;

    if (playerChoice === aiChoice) {
        resultText += "It's a tie! ⚖️ Spock remains confused!";
    } else if (rules[playerChoice].includes(aiChoice)) {
        resultText += "🎉 You win this round! Spock hesitates!";
        playerScore++;
        if (cliffPosition < maxCliffPosition) { 
            cliffPosition++;  // Step away from the edge
        }
    } else {
        resultText += "💀 You lost this round! Spock continues walking!";
        aiScore++;
        cliffPosition--;  // Step closer to the edge
    }

    // Update Cliff Bar and Spock's Status
    updateCliffUI();

    // Check if Spock Falls Off the Cliff
    if (cliffPosition === minCliffPosition) {
        document.getElementById("result").innerText = "😱 Spock falls! The Prime Directive has been violated!";
        document.getElementById("game").innerHTML = "<p>Refresh to try again.</p>";
        document.getElementById("spock-img").src = "spock-fallen.png";  // Change Spock's image
    }

    // Check if Spock Escapes
    if (cliffPosition === maxCliffPosition) {
        document.getElementById("result").innerText = "🖖 Spock regains control! 'Fascinating. Your logic has freed me from this peril.'";
        document.getElementById("game").innerHTML = "<p>Refresh to play again.</p>";
        document.getElementById("spock-img").src = "spock-safe.png";  // Change Spock's image
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

    // Change colors based on danger level
    if (cliffPosition <= 2) {
        cliffBar.style.backgroundColor = "red"; // Danger!
        document.getElementById("spock-img").src = "spock-danger.png";
    } else if (cliffPosition <= 5) {
        cliffBar.style.backgroundColor = "orange"; // Warning
        document.getElementById("spock-img").src = "spock-worried.png";
    } else {
        cliffBar.style.backgroundColor = "green"; // Safe
        document.getElementById("spock-img").src = "spock-safe.png";
    }
}