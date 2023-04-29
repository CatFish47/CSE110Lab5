// explore.js
let synth, voiceObj;
let faceImg, textInput, voiceSelect, playButton;

window.addEventListener('DOMContentLoaded', init);

function init() {
  synth = window.speechSynthesis;
  voiceObj = {};

  faceImg = document.querySelector('img');
  textInput = document.getElementById('text-to-speak');
  voiceSelect = document.getElementById('voice-select');
  playButton = document.querySelector('button');

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  playButton.addEventListener('click', () => {
    speak();
  });
}

function populateVoiceList() {
  const voices = synth.getVoices();

  for (let voice of voices) {
    const { name, lang } = voice;

    voiceObj[name] = voice;

    const option = document.createElement("option");
    option.textContent = `${name} (${lang})`;

    if (voice.default) {
      option.textContent += " - DEFAULT";
    }

    option.setAttribute('data-lang', lang);
    option.setAttribute('data-name', name);
    voiceSelect.appendChild(option);
  }
}

function speak() {
  const textSpeak = new SpeechSynthesisUtterance(textInput.value);
  const voice = voiceObj[voiceSelect.selectedOptions[0].getAttribute('data-name')];
  textSpeak.voice = voice;
  synth.speak(textSpeak);

  textSpeak.addEventListener('start', () => {
    faceImg.src = "assets/images/smiling-open.png";
    faceImg.alt = "Talking face";
  });

  textSpeak.addEventListener('end', () => {
    faceImg.src = "assets/images/smiling.png";
    faceImg.alt = "Smiling face";
  });
}