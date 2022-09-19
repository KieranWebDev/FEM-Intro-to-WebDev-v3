const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;

async function init() {
  let currentGuess = '';
  let currentRow = 0;

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      //add letter to the end
      currentGuess += letter;
    } else {
      //replace the last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  async function commit() {
    if (currentGuess.length != ANSWER_LENGTH) {
      //DO nothing
      return;
    }
    currentRow++;
    currentGuess = '';
  }

  //fetching word
  const res = await fetch('https://words.dev-apis.com/word-of-the-day');
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split('');
  setLoading(false);

  console.log(word);

  const guessParts = currentGuess.split('');

  for (let i = 0; i < ANSWER_LENGTH; i++) {
    if (guessParts[i] === wordParts[i]) {
      // mark as correct
      letters[currentRow * ANSWER_LENGTH + i].classList.add('correct');
    }
  }
  for (let i = 0; i < ANSWER_LENGTH; i++) {
    if (guessParts[i] === wordParts[i]) {
      //do nothing
    } else if (wordParts.includes(guessParts[i])) {
      letters[currentRow * ANSWER_LENGTH + i].classList.add('close');
    } else {
      letters[currentRow * ANSWER_LENGTH + i].classList.add('wrong');
    }
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = '';
  }

  document.addEventListener('keydown', function handleKeyPress(event) {
    const action = event.key;

    console.log(action);

    if (action === 'Enter') {
      commit();
    } else if (action === 'Backspace') {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      //do nothing
    }
  });
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
  loadingDiv.classList.toggle('show', isLoading);
}
init();
