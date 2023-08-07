
const letters = document.querySelectorAll(".scoreboard-letter");
const loading = document.querySelector(".info-bar");
console.log(letters);
async function init() {
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

init();
