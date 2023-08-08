
const letters = document.querySelectorAll(".scoreboard-letter");
const loading = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;

async function init() {
    let currentGues=""
    let currentWord=0

    const response=await fetch("https://words.dev-apis.com/word-of-the-day")
    const resObject=await response.json()

    const word=resObject.word.toUpperCase()
    const wordParts=word.split("")
    console.log(word);
    setLoading(false);


    function addLetter(letter) {
        // TODO: Add the letter to the end 
        if (currentGues.length < ANSWER_LENGTH) {
        
            currentGues += letter;
        
        }
        else{
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

        const guessParts=currentGues.split("")
        const map=makeUp(guessParts)
        console.log(map);
        for (let i=0;i<ANSWER_LENGTH;i++){
            if (guessParts[i]===wordParts[i]){
                letters[ANSWER_LENGTH*currentWord+i].classList.add("correct")
                map[guessParts[i]]--;
            }
           // else if (wordParts.includes(guessParts[i])){
        }

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if (guessParts[i]===wordParts[i]) {
               //do nothing
            }else if (wordParts.includes(guessParts[i]) && map[guessParts[i]]>0) {
                //  mark as  close
                letters[ANSWER_LENGTH*currentWord+i].classList.add("close")
                map[guessParts[i]]--;
            }
            else{
                letters[ANSWER_LENGTH*currentWord+i].classList.add("wrong")
            }
            
        }
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

function setLoading(isLoading) {
    console.log("setLoading", isLoading);
    loading.classList.toggle("hidden", !isLoading);
}

function makeUp(array) {
    const obj={};
    for (let i=0;i<array.length;i++){
        const letter=array[i];
        if (obj[letter]){
            obj[letter]++;
        }else{
            obj[letter]=1;
        }
    }
    return obj;

}

init();
