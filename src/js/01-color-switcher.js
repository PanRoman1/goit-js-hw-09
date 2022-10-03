
const refs = {
    bodyEl: document.body,
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {    
    intervalId = setInterval(() => {
        refs.bodyEl.style.background = getRandomHexColor()
    }, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
};
function onStopBtn() {    
    clearInterval(intervalId);    
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;  
}