// Music Player Logic
const playButton = document.querySelector('.play-btn');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const progressBar = document.querySelector('.progress');
const timeDisplay = document.querySelector('.time');

// Array of songs with their details
const songs = [
  { title: 'Song 1', artist: 'Artist 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { title: 'Song 2', artist: 'Artist 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { title: 'Song 3', artist: 'Artist 3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
];

let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio(songs[currentSongIndex].url);

const loadSong = () => {
  const song = songs[currentSongIndex];
  document.querySelector('.track-title').textContent = song.title;
  document.querySelector('.artist-name').textContent = song.artist;
  audio.src = song.url;
  audio.load();
};

const playPauseSong = () => {
  if (isPlaying) {
    audio.pause();
    playButton.textContent = 'Play';
  } else {
    audio.play();
    playButton.textContent = 'Pause';
  }
  isPlaying = !isPlaying;
};

const updateProgress = () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const changeProgress = () => {
  const newTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = newTime;
};

const nextSong = () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong();
  if (isPlaying) audio.play();
};

const prevSong = () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong();
  if (isPlaying) audio.play();
};

// Event Listeners
playButton.addEventListener('click', playPauseSong);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
progressBar.addEventListener('input', changeProgress);
audio.addEventListener('timeupdate', updateProgress);

// Initial load of the song
loadSong();
