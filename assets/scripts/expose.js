const confetti = new JSConfetti();

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.getElementById('horn-select');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playButton = document.querySelector('button');
  const audioElement = document.querySelector('audio');
  const imageElement = document.querySelector('#expose img');

  hornSelect.addEventListener('change', () => {
    const hornValue = hornSelect.value;

    if (hornValue === 'air-horn') {
      audioElement.src = 'assets/audio/air-horn.mp3';
      imageElement.src = 'assets/images/air-horn.svg';
    } else if (hornValue === 'car-horn') {
      audioElement.src = 'assets/audio/car-horn.mp3';
      imageElement.src = 'assets/images/car-horn.svg';
    } else if (hornValue === 'party-horn') {
      audioElement.src = 'assets/audio/party-horn.mp3';
      imageElement.src = 'assets/images/party-horn.svg';
    }
  });

  volumeSlider.addEventListener('input', () => {
    const volumeValue = volumeSlider.value;

    if (volumeValue === '0') {
      volumeIcon.src = 'assets/icons/volume-level-0.svg';
    } else if (volumeValue < 33) {
      volumeIcon.src = 'assets/icons/volume-level-1.svg';
    } else if (volumeValue < 67) {
      volumeIcon.src = 'assets/icons/volume-level-2.svg';
    } else {
      volumeIcon.src = 'assets/icons/volume-level-3.svg';
    }

    audioElement.volume = volumeValue / 100;
  });

  playButton.addEventListener('click', () => {
    if (hornSelect.value != 'select') {
      audioElement.play();
    }

    if (hornSelect.value === 'party-horn') {
      confetti.addConfetti({
        confettiRadius: 10,
        confettiNumber: 1000,
        confettiColors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
        emojis: ['🎉', '🐶', '🌮', '🌈', '🚀', '👽', '💩'],
        emojiSize: 100,
        confettiDuration: 8000,
        confettiSpeed: 15,
        confettiRotation: 360,
        confettiAccelerationY: 200,
        confettiAccelerationX: 50,
        confettiMaxCount: 1500,
      });
    }

  });
}