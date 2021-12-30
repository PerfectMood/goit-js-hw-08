var throttle = require('lodash.throttle');

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

const formData = {};
reloadMemory();
formEl.addEventListener('input', throttle(onSubmitFormInput, 500));

function onSubmitFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  localStorage.removeItem(STORAGE_KEY);
  console.log('Object', formData);
}

function reloadMemory() {
  const datalocalStorage = localStorage.getItem(STORAGE_KEY);
  const parsedDatalocalStorage = JSON.parse(datalocalStorage);
  if (parsedDatalocalStorage) {
    Object.entries(parsedDatalocalStorage).forEach(([name, value]) => {
      formEl.elements[name].value = value;
      formData[name] = value;
    });
  }
}
