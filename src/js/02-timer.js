import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';

let time = null;
let timerId = null;
const timer = document.querySelector('.timer');
const start = document.querySelector('[data-start]');
start.disabled = true;

const formTime = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0].getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
      start.disabled = true;
      return;
    }
    time = selectedDates[0].getTime();
    start.disabled = false;
  },
};

const timePicker = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value >= 10) return value.toString();
  else return `0${value}`;
}

const onStart = () => {
  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(time - Date.now());

    formTime.days.textContent = addLeadingZero(days);
    formTime.hours.textContent = addLeadingZero(hours);
    formTime.minutes.textContent = addLeadingZero(minutes);
    formTime.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
  start.disabled = true;
};

start.addEventListener('click', onStart);
