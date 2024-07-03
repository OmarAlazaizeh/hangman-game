let letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);
// console.log(lettersArray);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");

  span.innerHTML = letter;
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

let allKeys = Object.keys(words);
// console.log(allKeys);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomWordNumber = Math.floor(Math.random() * randomPropValue.length);
let randomWordName = randomPropValue[randomWordNumber];

console.log(randomWordName);

document.querySelector(".category span").innerHTML = randomPropName;

let letterGuessContainer = document.querySelector(".letters-guess");

let randomWordNameArray = Array.from(randomWordName);

randomWordNameArray.forEach((letter) => {
  let letterToGuessBox = document.createElement("div");

  if (letter === " ") {
    letterToGuessBox.className = "with-space";
  }

  letterGuessContainer.appendChild(letterToGuessBox);
});

let guessDivs = document.querySelectorAll(".letters-guess div");

let wrongAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  let theStatus = false;
  let successAttempts = 0;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // get the clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase();

    // get the chosen random word
    let chosenWord = Array.from(randomWordName.toLowerCase());

    chosenWord.forEach((wordLetter, wordIndex) => {
      // check if the clicked letter is one of the choesn word letters
      if (clickedLetter == wordLetter) {
        theStatus = true;
        guessDivs.forEach((divLetter, divIndex) => {
          // find the correct index to put the clicked letter
          if (wordIndex === divIndex) {
            divLetter.innerHTML = clickedLetter;
          }
        });
      }
    });

    if (theStatus !== true) {
      wrongAttempts++;

      theDraw.classList.add(`wrong-${wrongAttempts}`);

      document.getElementById("fail").play();

      if (wrongAttempts == 8) {
        endGame("lose");

        lettersContainer.classList.add("finished");
      }
    } else {
      // successAttempts++;
      document.getElementById("success-2").play();
    }
    console.log(chosenWord.length);
    guessDivs.forEach((divBox) => {
      if (divBox.innerHTML !== "") {
        successAttempts++;
      }
    });
    console.log(successAttempts);
    if (successAttempts == chosenWord.length) {
      endGame("won");
    }
  }
});

const overlay = document.getElementById("overlay");
// end game function
function endGame(state) {
  if (state == "lose") {
    let div = document.createElement("div");
    // let txt = document.createTextNode(`Game Over, the word is`);
    let word = `Game Over <br> the word is <div>${randomWordName}</div>`;

    // div.appendChild(txt);
    div.innerHTML = word;
    div.classList.add("popup", "active");
    document.body.appendChild(div);

    overlay.classList.add("active");
  } else {
    let div = document.createElement("div");
    // let txt = document.createTextNode(`Game Over, the word is`);
    let word = `Congrats, you win! <br> the word is <div>${randomWordName}</div>`;

    // div.appendChild(txt);
    div.innerHTML = word;
    div.classList.add("popup", "active");
    document.body.appendChild(div);

    overlay.classList.add("active");
  }
}

overlay.addEventListener("click", () => {
  const popups = document.querySelectorAll(".popup.active");
  popups.forEach((popup) => {
    closePopup(popup);
  });
});

function closePopup(popup) {
  if (popup == null) return;
  popup.classList.remove("active");
  overlay.classList.remove("active");
}
