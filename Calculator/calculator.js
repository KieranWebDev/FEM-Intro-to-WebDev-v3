let calcButtons = document.querySelector('.number');

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
}

function handleNumber(number) {
  console.log('number');
}

function handleSymbol(symbol) {
  console.log('symbol');
}

function init() {
  console.log('hi');
  document
    .querySelector('.calc-buttons')
    .addEventListener('click', function (event) {
      buttonClick(event.target.innerText);
    });
}
init();
