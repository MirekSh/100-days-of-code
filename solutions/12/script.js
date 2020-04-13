const music = [{ title: "Yummy", author: "Justin Bieber"}, { title: "Life Is Good", author: "Future featuring Drake"}, { title: "Godzilla", author: "Eminem featuring Juice Wrld"}, { title: "Don't Start Now", author: "Dua Lipa"}, { title: "Intentions", author: "Justin Bieber featuring Quavo"}, { title: "Blinding Lights", author: "The Weeknd"}, { title: "On", author: "BTS"}, { title: "Stupid Love", author: "Lady Gaga"}, { title: "Baby Pluto", author: "Lil Uzi Vert"}, { title: "Lo Mein", author: "Lil Uzi Vert"}, { title: "Silly Watch", author: "Lil Uzi Vert"}, { title: "Adore You", author: "Harry Styles"}, { title: "Say So", author: "Doja Cat"}];

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
progress.value = 0;
let request;

// Flags
let playFlag = false;
let randomFlag = false;

function setSong() {
    song.textContent = music[songIndex].title;
    artist.textContent = music[songIndex].author;
}

function setRandomSongIndex() {
    const random = Math.floor(Math.random() * musicArrLength);
    songIndex = random;
}
function nextSong() {
    randomFlag
        ? setRandomSongIndex()
        : songIndex === musicArrLength - 1
            ? songIndex = 0
            : songIndex += 1;
    setSong();
}

function previousSong() {
    randomFlag
        ? setRandomSongIndex()
        : songIndex === 0
            ? songIndex = musicArrLength - 1
            : songIndex -= 1;
    setSong();
}

function updateProgressBar() {
    const progressPercentage = audioElement.currentTime / audioElement.duration;
    progress.value = progressPercentage;
    requestAnimationFrame(updateProgressBar);
}

requestAnimationFrame(updateProgressBar);

// Event listeners
previousBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);
randomBtn.addEventListener('click', () => {
    randomFlag = !randomFlag;
    randomBtn.classList.toggle('active');
})

audioBtn.addEventListener('click', () => {
    audioBtn.classList.toggle('fa-volume-up');
    audioBtn.classList.toggle('fa-volume-off');
    audioElement.muted = !audioElement.muted
})

playBtn.addEventListener('click', () => {
    if(playFlag) {
        audioElement.pause();
    } else {
        audioElement.play();
    }
    playBtn.classList.toggle('fa-pause');
    playBtn.classList.toggle('fa-play');
    playFlag = !playFlag;
})

replayBtn.addEventListener('click', () => {
    audioElement.currentTime = 0;
    audioElement.play();
    playBtn.classList.toggle('fa-play');
    playBtn.classList.toggle('fa-pause');
})

// Functions to run
setSong();
