// expose.js
var playButton, audioSlider, hornSelect, hornImg, volumeImg, hornAudio;
const jsConfetti = new JSConfetti()
const hornTypes = {
  party: "party-horn",
  car: "car-horn",
  air: "air-horn"
}

window.addEventListener('DOMContentLoaded', init);

function init() {
  playButton = document.querySelector('button');
  audioSlider = document.getElementById('volume');
  hornSelect = document.getElementById('horn-select');
  hornImg = document.getElementsByTagName('img')[0];
  volumeImg = document.getElementsByTagName('img')[1];
  hornAudio = document.querySelector('audio');

  playButton.addEventListener('click', () => {
    playSound();
  });

  hornSelect.addEventListener('change', () => {
    changeHorn(hornSelect.value);
  });

  audioSlider.addEventListener('input', () => {
    changeVolume(audioSlider.value);
  });

  // init: change volume to default value of slider
  changeVolume(50);
}

function playSound() {
  hornAudio.play();

  if (hornSelect.value === hornTypes.party) {
    jsConfetti.addConfetti();
  }
}

function changeVolume(value) {
  let level;

  if (value == 0) { level = "0"; }
  else if (value < 33) { level = "1"; }
  else if (value < 66) { level = "2"; }
  else { level = "3"; }

  volumeImg.src = `assets/icons/volume-level-${level}.svg`;
  volumeImg.alt = `Volume level ${level}`;
  hornAudio.volume = value / 100;
}

function changeHorn(value) {
  if (value === "select") {
    hornAudio.src = '';
    hornImg.src = 'assets/images/no-image.png';
    hornImg.alt = 'No image selected';
  }

  hornAudio.src = `assets/audio/${value}.mp3`;
  hornImg.src = `assets/images/${value}.svg`;
  hornImg.alt = `${value.charAt(0).toUpperCase() + value.replace(/-/g, " ").slice(1)} image`;
}