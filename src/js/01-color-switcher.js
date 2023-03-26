const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
let intervaltId = null;

stop.disabled = true;

const changeBG = () => {
  document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
};

const onStart = () => {
  intervaltId = setInterval(changeBG, 1000);
  start.disabled = true;
  stop.disabled = false;
};

const onStop = () => {
  clearInterval(intervaltId);
  stop.disabled = true;
  start.disabled = false;
};

start.addEventListener('click', onStart);
stop.addEventListener('click', onStop);
