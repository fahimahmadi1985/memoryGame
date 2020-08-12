var gameStart = false;
var cards_array = [];
var selectedElem1, selectedElem2;
var totalScore = 0;
var consecutiveFailedAttempts = 0;
var cardInjectionCounter = 0;
var timerFlag = false;

function generate_game(rows, cols, imgNames) {
  document
    .getElementsByClassName("container")[0]
    .style.setProperty("--c", cols);
  document
    .getElementsByClassName("container")[0]
    .style.setProperty("--r", rows);

  let counter = 0;

  while (counter < rows * cols) {
    cards_array.push(
      `<div class="flip-card">
      <div class="flip-card-inner" data-id="elem-${counter}" data-name="${
        imgNames[counter].split(".")[0]
      }">
          <div class="flip-card-front" onclick="flipImage(this)" data-id="elem-${counter}" data-name="${
        imgNames[counter].split(".")[0]
      }">
              <img src="./img/questionLogo.png" alt="Avatar">
          </div>
          <div class="flip-card-back">
          <img src="./img/${imgNames[counter]}" alt="Avatar" name="${
        imgNames[counter]
      }">
          </div>
      </div>
  </div>`
    );
    counter++;
  }
}

function inject_cards(cards) {
  if (cardInjectionCounter == 0) {
    while (cards.length != 0) {
      var randomIndex = Math.floor(Math.random() * cards.length);
      document.getElementsByClassName("container")[0].innerHTML +=
        cards[randomIndex];
      cards.splice(randomIndex, 1);
    }
    cardInjectionCounter++;
  }
}
var imgNames = [
  "css.png",
  "handlebars.png",
  "html.png",
  "jquery.png",
  "js.png",
  "mongodb.png",
  "nodejs.jpeg",
  "react.png",
  "css.png",
  "handlebars.png",
  "html.png",
  "jquery.png",
  "js.png",
  "mongodb.png",
  "nodejs.jpeg",
  "react.png",
];
/* generate_game(4, 4, imgNames);
inject_cards(cards_array); */

//select and flip image
function flipImage(element) {
  //first click
  if (gameStart) {
    if (!selectedElem1) {
      selectedElem1 = element.parentNode;
      selectedElem1.classList.add("flip-card-inner-rotate");
    } else {
      selectedElem2 = element.parentNode;
      selectedElem2.classList.add("flip-card-inner-rotate");

      //compare second selected elemment with first selected element
      if (selectedElem1.dataset.name === selectedElem2.dataset.name) {
        //reset selected element for the next pair
        selectedElem1 = null;
        selectedElem2 = null;

        consecutiveFailedAttempts = 0;
        totalScore += 12.5;
      } else {
        setTimeout(flipBack, 1000, selectedElem1, selectedElem2);

        consecutiveFailedAttempts++;
        if (consecutiveFailedAttempts === 4) {
          consecutiveFailedAttempts = 0;
          totalScore = 0;
        }
        //reset selected element fro next try
        selectedElem1 = null;
        selectedElem2 = null;
      }

      document.getElementById(
        "score"
      ).innerHTML = `Score: ${totalScore}  &emsp; FA: ${consecutiveFailedAttempts}`;
    }
  }
}

//flipback if selected pairs are not equal
function flipBack(elem1, elem2) {
  elem1.classList.remove("flip-card-inner-rotate");
  elem2.classList.remove("flip-card-inner-rotate");
}

//timer
function timer() {
  gameStart = true;
  timerFlag = true;
  var time = 0;
  //setInterval helps us to count the number of seconds like a loop.  syntax =>    var myInterval = setInterval(function(){yourcode}, delay);   and clearInterval(myInterval) stop it.
  var timer = setInterval(
    () => {
      //find all fliped cards. because when cards fliped we added this class
      var flipedElements = document.getElementsByClassName(
        "flip-card-inner-rotate"
      );

      //check if all cards fliped successfully
      if (flipedElements.length != 16) {
        time++;
        document.getElementById("timer").innerHTML = `${time} Sec`;
      } else {
        clearInterval(timer);
        alert(`You get ${totalScore} points..!`);
      }
    },
    1000,
    time
  );
}

//function start game
function start() {
  generate_game(4, 4, imgNames);
  inject_cards(cards_array);
  !timerFlag ? timer() : null;
}
