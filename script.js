const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('playBtn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullScreenBtn = document.getElementById('fullscreenIcon');


// PLAY & PAUSE=======================================

function showPlayIcon(){
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay(){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    }
    else{
        video.pause();
        showPlayIcon();
    }
}

// ON VIDEO END, SHOW PLAY BTN ICON
video.addEventListener('ended', showPlayIcon); 

// PROGRESS BAR=======================================

// CALCULATE DISPLAY TIME FORMAT
function displayTime(time){
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    // THIS IS FOR DISPLAT REASONS OF THE SECS
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

// UPDATE PROGRESS BAR AS VIDEO PLAYS
function updateProgress(){
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}


// CLICK TO SEEK WITHIN THE VIDEO
function setProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// VOLUME CONTROLS====================================

// SET DEFAULT VOLUME TO 1 WHICH IS 100%
let lastVolume = 1;

// VOLUME BAR
function changeVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    // ROUNDING VOLUME UP OR DOWN
    volume = volume < 0.1 ? 0 : volume > 0.9 ? 1 : volume; 
    volumeBar.style.width = `${volume *100}%`;
    video.volume = volume;
    // CHANGE ICON DEPENDING ON VOLUME
    volumeIcon.className = '';
    if(volume > 0.7){
        volumeIcon.classList.add('fa-solid', 'fa-volume-high');
    }
    else if(volume < 0.7 && volume > 0){
        volumeIcon.classList.add('fa-solid', 'fa-volume-low');
    }
    else if(volume === 0){
        volumeIcon.classList.add('fa-solid','fa-volume-off');
    }
    lastVolume = volume;
}

// MUTE/UNMUTE
function toggleMute() {
    // CLEAR THE ICON PREVIOUS CLASSES
    volumeIcon.className = ''; 
    if (video.volume > 0) {
        // SAVE CURRENT VOLUME BE4 MUTING
        lastVolume = video.volume;
        // MUTE THE VIDEO
        video.volume = 0;
        // SET VOLUME BAR WIDTH TO 0
        volumeBar.style.width = 0; 
        // MUTE ICON
        volumeIcon.classList.add('fa-solid', 'fa-volume-xmark');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        // RESTORE THE LAST VOL WHEN UNMUTING
        // DEFAULT TO 50% IF lastVolume IS NOT SET
        video.volume = lastVolume || 0.5; 
        // ADJUST VOLUME BAR
        volumeBar.style.width = `${video.volume * 100}%`;
        if (video.volume > 0.7) {
            volumeIcon.className = 'fa-solid fa-volume-high'; 
        } else if (video.volume > 0) {
            volumeIcon.className = 'fa-solid fa-volume-low'; 
        }
        volumeIcon.setAttribute('title', 'Mute');
    }
}


// CHANGE PLAYBACK SPEED==============================

function changeSpeed(){
    video.playbackRate = speed.value;
}

// FULLSCREEN=========================================
// OPEN FULLSCREEN
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } 
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();   // Firefox
    }
    else if (elem.webkitRequestFullscreen) {   // Chrome, Safari, Opera
      elem.webkitRequestFullscreen();
    } 
    else if (elem.msRequestFullscreen) {   // IE/Edge
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
// CLOSE FULLSCREEN
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } 
    else if (document.mozCancelFullScreen) {  // Firefox
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {   // Chrome, Safari, Opera
      document.webkitExitFullscreen();
    } 
    else if (document.msExitFullscreen) {   // IE/Edge
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

let fullscreen = false;
// TOGGLE FULLSCREEN
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
        // Replace 'fa-expand' with 'fa-compress' on the icon
        fullScreenBtn.classList.replace('fa-expand', 'fa-compress');
        fullScreenBtn.setAttribute('title', 'Exit Fullscreen');
    } else {
        closeFullscreen();
        // Replace 'fa-compress' with 'fa-expand' on the icon
        fullScreenBtn.classList.replace('fa-compress', 'fa-expand');
        fullScreenBtn.setAttribute('title', 'Fullscreen');
    }
    fullscreen = !fullscreen;
}





// EVENT LISTENERS====================================
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullScreenBtn.addEventListener('click', toggleFullscreen);