let wordDom = document.getElementById("word")
let countDom = document.getElementById("count")
let guessesDom = document.getElementById("guesses")
let solutionDom = document.getElementById("solution")
let imageDom = document.getElementById("image")
let resultDom = document.getElementById("result")
let startDom = document.getElementById("start")



const words = ["han solo", "jedi", "yoda", "droid", "leia", "death star", "darth vader", "the force", "lightsaber", "storm trooper", "empire", "rebel alliance", "padawan", "jedi master", "millenium falcon", "mace windu", "obi-wan kenobi"]

let word;
let count;
let wrongGuesses = []
let correctGuesses = []
let totalGuesses = []

let letters = "qwertyuiopasdfghjklzxcvbnm"

function createDisplay(str) {
    let displayString = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === " ") {
            displayString += "&nbsp;"
        }
        else if (str[i] === "-") {
            displayString += "-";
        }
        else if (correctGuesses.includes(str[i])) {
            displayString += str[i]
        }
        else {
            displayString += "_"
        }
        // displayString += "&nbsp;"
        console.log(`Iteration:  ${i}`);
    }

    // checks if display string still has an _ and continues if so.
    if (displayString.includes("_")) {
        return displayString;
    }
    else {
        solutionDom.innerHTML = word
        count = 11;
        wrongGuesses = []
        correctGuesses = []
        totalGuesses = []
        word = words[Math.floor(Math.random() * words.length)]
        return createDisplay(word)
    }
}

document.onkeyup = (event) => {
    let letter = event.key.toLowerCase()
    if (letters.includes(letter)) {
        if (totalGuesses.includes(letter)) {
            return
        }
        else if (word.includes(letter)) {
            correctGuesses.push(letter);
            totalGuesses.push(letter);
            wordDom.innerHTML = createDisplay(word)
        }
        else {
            wrongGuesses.push(letter)
            totalGuesses.push(letter)
            count--
            if (count <= 0) {
                loseGame()
            }
            else {
                countDom.innerHTML = count
                guessesDom.innerHTML = displayGuesses(wrongGuesses)
            }
        }
    }
}

function displayGuesses(wrongGuesses) {
    let letter = wrongGuesses.join(" ")
    return letter

}

function winGame(newWord) {
    solutionDom.innerHTML = `<h2>You Got It! <br /> ${word}`
    resetGame()

}

function loseGame() {
    resultDom.innerHTML = `<h2> You lose! <h2>`;
    countDom.innerHTML = 0

}

function resetGame() {
    word = words[Math.floor(Math.random() * words.length)]
    count = 11;
    wrongGuesses = []
    correctGuesses = []
    totalGuesses = []
    let newword = createDisplay(word)
    wordDom.innerHTML = newword
    countDom.innerHTML = count
}



startDom.onclick = (event) => {
    resetGame()
}

resetGame()
