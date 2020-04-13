const music = [["Yummy", "Justin Bieber"], ["Life Is Good", "Future featuring Drake"], ["Godzilla", "Eminem featuring Juice Wrld"], ["Don't Start Now", "Dua Lipa"], ["Intentions", "Justin Bieber featuring Quavo"], ["Blinding Lights", "The Weeknd"], ["On", "BTS"], ["Stupid Love", "Lady Gaga"], ["Baby Pluto", "Lil Uzi Vert"], ["Lo Mein", "Lil Uzi Vert"], ["Silly Watch", "Lil Uzi Vert"], ["Adore You", "Harry Styles"], ["Say So", "Doja Cat"]];

// DOM elements
const song = document.querySelector('.song');
const artist = document.querySelector('.artist');
const playBtn = document.querySelector('.play');
const replayBtn = document.querySelector('.replay');
const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const randomBtn = document.querySelector('.random');
const audioBtn = document.querySelector('.audio');
const hamburgerBtn = document.querySelector('.hamburger');
const audioElement = document.querySelector('.audioElement');
const progress = document.querySelector('.custom-progress')

const musicArrLength = music.length;
let songIndex = 0;

// Flags
let playFlag = false;
let audioFlag = false;
let randomFlag = false;

function setSong() {
    console.log(songIndex);
    song.textContent = music[songIndex][0];
    artist.textContent = music[songIndex][1];
}

function randomSong() {
    const random = Math.floor(Math.random() * musicArrLength);
    songIndex = random;
}
function nextSong() {
    randomFlag
        ? randomSong()
        : songIndex === musicArrLength - 1
            ? songIndex = 0
            : songIndex += 1;
    setSong();
}

function previousSong() {
    randomFlag
        ? randomSong()
        : songIndex === 0
            ? songIndex = musicArrLength - 1
            : songIndex -= 1;
    setSong();
}

function updateProgressBar() {
    const progressPercentage = audioElement.currentTime / audioElement.duration;
    progress.value = progressPercentage;
}

// Event listeners
previousBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);
randomBtn.addEventListener('click', () => {
    randomFlag = !randomFlag;
    randomFlag ? randomBtn.classList.add('active') : randomBtn.classList.remove('active');
})
audioBtn.addEventListener('click', () => {
    if(audioFlag) {
        audioBtn.classList.remove('fa-volume-up');
        audioBtn.classList.add('fa-volume-off');
    } else {
        audioBtn.classList.remove('fa-volume-off');
        audioBtn.classList.add('fa-volume-up');
    }
    audioFlag = !audioFlag;
})

playBtn.addEventListener('click', () => {
    if(playFlag && audioElement.paused) {
        audioElement.play();
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');
    } else {
        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
        audioElement.pause();
    }
    playFlag = !playFlag;
})

// Functions to run
setSong();
setInterval(updateProgressBar, 10);
