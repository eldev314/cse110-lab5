window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const select = document.querySelector('select');
  const textarea = document.querySelector('textarea');
  const button = document.querySelector('button');
  const face = document.querySelector('img');

  let voices = [];
  function populateVoices() {
    voices = synth.getVoices();
    select.innerHTML = voices
      .map((voice, i) => `<option value="${i}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }
  populateVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoices;
  }

  function speak() {
    if (synth.speaking) {
      //avoid queueing tts
      return;
    }
    if (textarea.value !== '') {
      const utterThis = new SpeechSynthesisUtterance(textarea.value);
      const selectedVoice = voices[select.value];
      utterThis.voice = selectedVoice;
      synth.speak(utterThis);
      face.setAttribute('src', 'assets/images/smiling-open.png');
      utterThis.addEventListener('end', () => {
        face.setAttribute('src', 'assets/images/smiling.png');
      });
    }
  }
  
  button.addEventListener('click', speak);
  synth.onend = () => {
    face.setAttribute('src', 'assets/images/smiling.png');
  };
}