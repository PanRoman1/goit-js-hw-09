import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs = {
    date: document.querySelector('#datetime-picker'),    
    startBtn: document.querySelector('[data-start]'),  
    displayDays: document.querySelector('[data-days]'),  
    displayHours: document.querySelector('[data-hours]'),  
    displayMinutes: document.querySelector('[data-minutes]'),  
    displaySeconds: document.querySelector('[data-seconds]'),
    timer: document.querySelector('.timer'),
    field: document.querySelectorAll('.field'),
    value: document.querySelectorAll('.value'),
    label: document.querySelectorAll('.label'),  
};

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) { 
    let deltaTime = selectedDates[0].getTime() - Date.now();
    if (deltaTime <= 0) Notify.failure('Please choose a date in the future');
    else {
      refs.startBtn.disabled = false;
    }
  },
};

const targetDate = flatpickr(refs.date, options);

function onStartBtnClick() {
  outputTimer(targetDate.selectedDates[0].getTime());
  intervalId = setInterval(
    outputTimer,
    1000,
    targetDate.selectedDates[0].getTime()
  );
  refs.startBtn.disabled = true;
  refs.date.disabled = true;  
}

function currentTimerValue(targetTime) {
  return convertMs(targetTime - Date.now());
}

function displayTimer({ days, hours, minutes, seconds }) {
  refs.displayDays.textContent = days;
  refs.displayHours.textContent = pad(hours);
  refs.displayMinutes.textContent = pad(minutes);
  refs.displaySeconds.textContent = pad(seconds);
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(intervalId);
    Notify.info('The time is over!');
    refs.date.disabled = false;
  }
}

function outputTimer(selectedDate) {
  displayTimer(currentTimerValue(selectedDate));
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}


refs.timer.style.display = 'flex';

refs.timer.style.marginTop = '15px';

refs.field.forEach(e => {
    e.style.display = 'grid';    
    e.style.marginRight = '15px';    
});

refs.value.forEach(e => {
    e.style.margin = 'auto';
    e.style.fontSize = '35px';    
});

refs.label.forEach(e => {
     e.style.margin = 'auto';
    e.style.fontSize = '15px';
});
