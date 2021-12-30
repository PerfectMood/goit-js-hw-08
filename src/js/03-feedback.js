import throttle from 'lodash.throttle';

const formEl = document.querySelector('form');
const LOCALSTORAGEKEY = 'feedback-form-state';
changeInput();
formEl.addEventListener('submit', onSubmitForm);
formEl.addEventListener('input', throttle(onChangeLocalStorage, 500));

function onChangeLocalStorage(evt) {
  let inputObj = localStorage.getItem(LOCALSTORAGEKEY);
  if (inputObj) {
    inputObj = JSON.parse(inputObj);
  } else {
    inputObj = {};
  }

  inputObj[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify(inputObj));
}

function onSubmitForm(evt) {
  evt.preventDefault();
  const formData = new FormData(formEl);
  const objSubmit = {};
  formData.forEach((value, name) => (objSubmit[name] = value));
  console.log(objSubmit);

  formEl.reset();
  localStorage.removeItem(LOCALSTORAGEKEY);
}

function changeInput() {
  let inputObj = localStorage.getItem(LOCALSTORAGEKEY);
  if (inputObj) {
    inputObj = JSON.parse(inputObj);
    Object.entries(inputObj).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
}
