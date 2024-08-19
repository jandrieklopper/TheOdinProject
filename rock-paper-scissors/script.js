let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(humanChoice) {
    const computerChoice = getComputerChoice();
    const resultDiv = document.getElementById("results");
    const scoreDiv = document.getElementById("score");

    if (humanChoice === computerChoice) {
        resultDiv.textContent = "It's a tie!";
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "scissors" && computerChoice === "paper") ||
        (humanChoice === "paper" && computerChoice === "rock")
    ) {
        resultDiv.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
        humanScore++;
    } else {
        resultDiv.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
        computerScore++;
    }

    scoreDiv.textContent = `Score: Human ${humanScore} - Computer ${computerScore}`;

    if (humanScore === 5 || computerScore === 5) {
        if (humanScore === 5) {
            resultDiv.textContent = "Congratulations! You won the game!";
        } else {
            resultDiv.textContent = "Sorry, you lost the game!";
        }
        // Reset scores after game ends
        humanScore = 0;
        computerScore = 0;
    }
}

document.getElementById("rock").addEventListener("click", () => playRound("rock"));
document.getElementById("paper").addEventListener("click", () => playRound("paper"));
document.getElementById("scissors").addEventListener("click", () => playRound("scissors"));
