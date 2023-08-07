
const letters = document.querySelectorAll(".scoreboard-letter");
const loading = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;

async function init() {
    let currentGues=""
    let currentWord=0

    function addLetter(letter) {
        // TODO: Add the letter to the end 
        if (currentGues.length < ANSWER_LENGTH) {
            currentGues += letter;
        }
        else{
            // replace last letter
            console.log("replace last letter");
            currentGues=currentGues.substring(0,currentGues.length-1)+letter;
        }
        letters[ANSWER_LENGTH*currentWord+currentGues.length - 1].innerText = letter;
    }

    async function commit() {
        if (currentGues.length !== ANSWER_LENGTH) {
            // do notning
            return 
        }

        // TODO validate word

        // TODO do all the marking "correct" "close" or "wrong"

        // TODO did they win or lose?


        currentWord++;
        currentGues="";    
    
    }

    function removeLetter(){
        currentGues=currentGues.substring(0,currentGues.length-1);
        letters[ANSWER_LENGTH*currentWord+currentGues.length].innerText = "";
    }
document.addEventListener("keydown", function (event) {
    const action = event.key;

    if (action === "Enter") {
    commit();
    } else if (action === "Backspace") {
    removeLetter();
    } else if (isLetter(action)) {
    addLetter(action.toUpperCase());
    }
    });
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

init();
