const drumPadTable = document.querySelector('.drum-pad-table');
const bankBtn = document.querySelector('.bank-toggle-btn');
const powerBtn = document.querySelector('.power-toggle-btn');
const display = document.querySelector('.drum-pad-display');

let pads = document.querySelectorAll('.drum-pad');

function createAudioElement(path, keyCode) {
  const audio = document.createElement('audio');

  audio.src = path;
  audio.dataset.key = keyCode;

  return audio;
}

function createDrumPadElement(key, title, path, keyCode) {
  const pad = document.createElement('div');
  const kbd = document.createElement('kbd');
  const span = document.createElement('span');
  const audio = createAudioElement(path, keyCode);

  kbd.textContent = key;

  span.textContent = title;
  span.className = 'sound-title'

  pad.classList.add('drum-pad');
  pad.dataset.key = keyCode;
  pad.appendChild(kbd);
  pad.appendChild(span);
  pad.appendChild(audio);

  return pad;
}

function createDrumPadTable(bank) {
  bank.forEach(sound => {
    const pad = createDrumPadElement(sound.key, sound.title, sound.path, sound.keyCode);
    drumPadTable.appendChild(pad);
  });
}

function toggleBank() {
  drumPadTable.innerHTML = '';

  bankBtn.checked ? createDrumPadTable(Bank.hh) : createDrumPadTable(Bank.trap);
  
  pads = [...drumPadTable.children];
  pads.forEach(pad => pad.addEventListener('transitionend', removeTransition));
}

function togglePower() {
  if (!powerBtn.checked) display.textContent = 'POWER OFF';
}

function displaySoundTitle(pad) {
  const title = pad.querySelector('.sound-title').textContent;

  display.textContent = title;
}

function playSound(event, pad) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`)

  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  
  pad.classList.add('playing');
}

function drumPadPlay(event) {
  const pad = document.querySelector(`.drum-pad[data-key="${event.keyCode}"]`)

  if (pad !== null) {
    if (!powerBtn.checked) return;
    playSound(event, pad);
    displaySoundTitle(pad);
  }
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;

  this.classList.remove('playing');
}

powerBtn.addEventListener('change', togglePower);
bankBtn.addEventListener('change', toggleBank);
document.addEventListener('DOMContentLoaded', toggleBank);
window.addEventListener('keydown', drumPadPlay);