const songs = [
  {
    title: "Song One",
    artist: "Unknown Artist",
    src: "songs/song1.mp3"
  },
  {
    title: "Song Two",
    artist: "Unknown Artist",
    src: "songs/song2.mp3"
  },
  {
    title: "Song Three",
    artist: "Unknown Artist",
    src: "songs/song3.mp3"
  }
];

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressContainer = document.getElementById('progressContainer');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const playlistEl = document.getElementById('playlist');

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  updateActivePlaylistItem();
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = '⏸';
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = '▶';
}

function togglePlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function updateProgress() {
  const { currentTime, duration } = audio;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
  }
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function renderPlaylist() {
  playlistEl.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

function updateActivePlaylistItem() {
  const items = playlistEl.querySelectorAll('li');
  items.forEach((item, index) => {
    item.classList.toggle('active', index === currentSongIndex);
  });
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});
audio.addEventListener('ended', nextSong);

renderPlaylist();
loadSong(currentSongIndex);