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

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let deltaTime = selectedDates[0].getTime() - currentDate;

    if (deltaTime <= 0) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
     
      refs.startBtn.addEventListener('click', () => {

        intervalId = setInterval(() => {
          
          const newTime = Date.now();
          this.isActive = true;
          const newDelta = selectedDates[0].getTime() - newTime;
          refs.date.disabled = true;          
          refs.startBtn.disabled = true;          
          const BackTimer = convertMs(newDelta);
          refs.displaySeconds.textContent = addLeadingZero(BackTimer.seconds);
          refs.displayMinutes.textContent = addLeadingZero(BackTimer.minutes);
          refs.displayHours.textContent = addLeadingZero(BackTimer.hours);
          refs.displayDays.textContent = addLeadingZero(BackTimer.days);
          if (newDelta <= 1000) {
            clearInterval(intervalId); 
            Notify.info('The time is over!');
            refs.date.disabled = false;
          }
        }, 1000);
      });
    }
  },
};

flatpickr(refs.date, options);

const currentDate = Date.now();

function addLeadingZero(value) {
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
