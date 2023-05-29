const emailInput = document.getElementById('email');
const loginButton = document.getElementById('submit-button');
const passwordInput = document.getElementById('password');

const login = (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  console.log(e);
  if (email === 'tryber@teste.com' && password === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
};

window.onload = () => {
  loginButton.addEventListener('click', login);
};

const agreementCheckbox = document.getElementById('agreement');
const submitButton = document.getElementById('submit-btn');

function toggleSubmitButton() {
  submitButton.disabled = !agreementCheckbox.checked;
}

agreementCheckbox.addEventListener('change', toggleSubmitButton);
submitButton.disabled = true;

const textarea = document.getElementById('textarea');
const counter = document.getElementById('counter');
const maxLength = 500;

function updateCounter() {
  const currentLength = textarea.value.length;
  console.log(currentLength);
  const remainingLength = maxLength - currentLength;
  counter.textContent = remainingLength;
}
textarea.addEventListener('input', updateCounter);
