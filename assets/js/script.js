//selecting all required elements

const selectBox = document.querySelector('.select-box');
const selectBtnX = selectBox.querySelector('.playerX');
const selectBtnO = selectBox.querySelector('.playerO');
const playBoard = document.querySelector('.play-board');
const players = document.querySelector('.players');
const allBox = document.querySelectorAll('section span');
const resultBox = document.querySelector('.result-box');
const wonText = resultBox.querySelector('.won-text');
const replayBtn = resultBox.querySelector('.btn');

window.onload = () => {
  //once window loaded
  for (let i = 0; i < allBox.length; i++) {
    //add onclick attribute in all available span
    allBox[i].setAttribute('onclick', 'clickedBox(this)');
  }
};

selectBtnX.addEventListener('click', () => {
  console.log('received');
  //hiding select box
  selectBox.classList.add('hide');

  //show the playboard section
  playBoard.classList.add('show');
});

selectBtnO.addEventListener('click', () => {
  //hide select box
  selectBox.classList.add('hide');

  //show the playboard section
  playBoard.classList.add('show');

  //settin the class attribute in players with players active player values
  players.setAttribute('class', 'players active player');
});

//class name of X icon
let playerXIcon = 'fas fa-times';

//class name of O icon
let playerOIcon = 'far fa-circle';

// Global Variable
let playerSign = 'X';

// Activating the BOT Player
let runBot = true;

// user click function
function clickedBox(element) {
  if (players.classList.contains('player')) {
    //if player choose (O) -> playerSign to O
    playerSign = 'O';

    //adding circle icon tag inside user clicked element/box
    element.innerHTML = `<i class="${playerOIcon}"></i>`;

    ///add active class in players
    players.classList.remove('active');

    //set id attribute in span/box with player choosen sign
    element.setAttribute('id', playerSign);
  } else {
    //adding cross icon tag inside user clicked element/box
    element.innerHTML = `<i class="${playerXIcon}"></i>`;

    //set id attribute in span/box with player choosen sign
    element.setAttribute('id', playerSign);

    ///add active class in players
    players.classList.add('active');
  }
  //calling selectWinner function
  selectWinner();

  //A box selected cannot be clicked again
  element.style.pointerEvents = 'none';

  //add pointerEvents none to playboard so user can't immediately click on any other box until bot select
  playBoard.style.pointerEvents = 'none';

  //generating random number so bot will randomly delay to select unselected box
  let randomTimeDelay = (Math.random() * 1000 + 200).toFixed();

  setTimeout(() => {
    //calling bot function
    bot(runBot);
  }, randomTimeDelay); //random delay value
}

// bot auto select function
function bot() {
  //creating empty array...we'll store unclicked boxes index
  let array = [];

  if (runBot) {
    //if runBot is true

    //change the playerSign to O so if player has chosen X then bot will O
    playerSign = 'O';
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        //if the box/span has no children means <i> tag

        //inserting unclicked boxes number/index inside array
        array.push(i);
      }
    }

    //getting random index from array so bot will select random unselected box
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if (array.length > 0) {
      //if array length is greater than 0

      if (players.classList.contains('player')) {
        //if player has chosen O then bot will X
        playerSign = 'X';

        //adding cross icon tag inside bot selected element
        allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;

        //set id attribute in span/box with player choosen sign
        allBox[randomBox].setAttribute('id', playerSign);

        ///add active class in players
        players.classList.add('active');
      } else {
        //adding circle icon tag inside bot selected element
        allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;

        //remove active class in players
        players.classList.remove('active');

        //set id attribute in span/box with player choosen sign
        allBox[randomBox].setAttribute('id', playerSign);
      }
      //calling selectWinner function
      selectWinner();
    }
    //once bot select any box then user can't click on that box
    allBox[randomBox].style.pointerEvents = 'none';

    //add pointerEvents auto in playboard so user can again click on box
    playBoard.style.pointerEvents = 'auto';

    //if player has chosen X then bot will be O right then we change the playerSign again to X so user will X because above we have changed the playerSign to O for bot
    playerSign = 'X';
  }
}

function getIdVal(classname) {
  //return id value
  return document.querySelector('.box' + classname).id;
}
function checkIdSign(val1, val2, val3, sign) {
  //checking all id value is equal to sign (X or O) or not if yes then return true
  if (
    getIdVal(val1) == sign &&
    getIdVal(val2) == sign &&
    getIdVal(val3) == sign
  ) {
    return true;
  }
}
function selectWinner() {
  //if the one of following winning combination match then select the winner
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    //passing the false boolen value to runBot so bot won't run again
    runBot = false;
    //calling bot function
    bot(runBot);
    setTimeout(() => {
      //after match won by someone then hide the playboard and show the result box after 700ms
      resultBox.classList.add('show');
      playBoard.classList.remove('show');
    }, 700); //1s = 1000ms
    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`; //displaying winning text with passing playerSign (X or O)
  } else {
    //if all boxes/element have id value and still no one win then draw the match
    if (
      getIdVal(1) != '' &&
      getIdVal(2) != '' &&
      getIdVal(3) != '' &&
      getIdVal(4) != '' &&
      getIdVal(5) != '' &&
      getIdVal(6) != '' &&
      getIdVal(7) != '' &&
      getIdVal(8) != '' &&
      getIdVal(9) != ''
    ) {
      runBot = false; //passing the false boolen value to runBot so bot won't run again
      bot(runBot); //calling bot function
      setTimeout(() => {
        //after match drawn then hide the playboard and show the result box after 700ms
        resultBox.classList.add('show');
        playBoard.classList.remove('show');
      }, 700); //1s = 1000ms
      wonText.textContent = 'Match has been drawn!'; //displaying draw match text
    }
  }
}

replayBtn.onclick = () => {
  //reload the current page on replay button click
  window.location.reload();
};
