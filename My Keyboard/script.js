let input_area = document.querySelector(".input_area");
let genText = document.getElementById("genText");
let randomCharacter = 'a';
let randArray = [];
let wrong = 0;
let seconds = 0;
let intervalID; 

if (document.getElementById("start") != null) {
    let start = document.getElementById("start");
    start.style.visibility = "hidden";
}

if (document.getElementById("timer") != null) {
    let timer = document.getElementById("timer");
    let errors = document.getElementById("errors");
    let end = document.getElementById("end");
    timer.style.visibility = "hidden";
    errors.style.visibility = "hidden";
    end.style.visibility = "hidden";
}

function chooseLetters() {
    localStorage.letters = myLetters.value;
    start.style.visibility = "visible";
}

function randomizeLetters() {
    let copyText = document.getElementById("copyText");
    copyText.style.display = "none";
    let choice = localStorage.letters;
    for (var i = 1; i < 201; i++) {
        randomCharacter = choice[Math.floor(Math.random() * choice.length)];
        randArray.push(randomCharacter);
        if (i % 4 == 0) {
            randArray.push(" ");
        }
    }
    randArray.pop();
    randString = randArray.join("");
    randString.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        genText.appendChild(charSpan);
    })
    intervalID = setInterval(function () {
        seconds++;
    }, 1000);
}

function processText() {
    currInput = input_area.value;
    inputArray = currInput.split('');
    inputArray.shift();
    wrong = 0;
    spanArray = genText.querySelectorAll('span');
    spanArray.forEach((char, index) => {
        let typedChar = inputArray[index];

        if (typedChar == null) {
            char.classList.remove('correctChar');
            char.classList.remove('incorrectChar');

        } else if (typedChar === char.innerText) {
            char.classList.add('correctChar');
            char.classList.remove('incorrectChar');

        } else {
            char.classList.add('incorrectChar');
            char.classList.remove('correctChar');
            wrong++;
        }
    });
    if (arraysEqual(inputArray, randArray)) {
        clearInterval(intervalID);
        timer.style.visibility = "visible";
        errors.style.visibility = "visible";
        end.style.visibility = "visible";
        timer.innerHTML = "Time: " + seconds + " sec." ;
        errors.innerHTML = "Errors: " + wrong;
        input_area.disabled = true;
    }
}


function arraysEqual(a1, a2) {
    return JSON.stringify(a1) == JSON.stringify(a2);
}
