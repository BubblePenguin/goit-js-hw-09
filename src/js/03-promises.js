import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}

const res = ({ position, delay }) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

const rej = ({ position, delay }) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i)
      .then(res)
      .catch(rej);
  }

  document.querySelectorAll('.form input').forEach(input => (input.value = ''));
});
