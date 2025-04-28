const songs = [
    {
        title: "Money Trees",
        url: "https://r2.fivemanage.com/vLBd6BI44AXzwKV73zLmS/MoneyTrees.mp3"
    },
    {
        title: "Magnolia",
        url: "https://r2.fivemanage.com/vLBd6BI44AXzwKV73zLmS/PlayboiCartiMagnoliaOfficialVideo.mp3"
    },
    {
        title: "Said Its Lit",
        url: "https://r2.fivemanage.com/vLBd6BI44AXzwKV73zLmS/22GzSaidItsLitOfficialMusicVideo.mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;

const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeSlider = document.getElementById('volume-slider');
const currentSongElement = document.getElementById('current-song');
const progressBar = document.querySelector('.progress-bar');

// Initialize audio player
function initializePlayer() {
    audioPlayer.src = songs[currentSongIndex].url;
    currentSongElement.textContent = songs[currentSongIndex].title;
    audioPlayer.volume = volumeSlider.value / 100;
}

// Play/Pause toggle
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Previous song
function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    initializePlayer();
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Next song
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    initializePlayer();
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Update progress bar
function updateProgress() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', playPrevious);
nextBtn.addEventListener('click', playNext);
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value / 100;
});

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', playNext);

// Loading progress simulation
let loadingProgress = 0;
const loadingInterval = setInterval(() => {
    loadingProgress += Math.random() * 2;
    if (loadingProgress >= 100) {
        loadingProgress = 100;
        clearInterval(loadingInterval);
    }
    progressBar.style.width = `${loadingProgress}%`;
}, 100);

// Initialize the player when the page loads
initializePlayer(); 