'use strict';
const mediaPlayer = document.getElementsByClassName('mediaplayer')[0];
const player = mediaPlayer.getElementsByTagName('audio')[0];
const trackList = [ 
	{title: 'LA Chill Tour', src: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3'},
	{title: 'This is it band', src: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3'},
	{title: 'LA Fusion Jam', src: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3'}
];
player.src = trackList[0].src;
const lastTrackNum = trackList.length - 1;
let currentTrackNum = trackList.findIndex(track => (track.src === player.src));
const mediaPlayerControlTitlePanel = mediaPlayer.getElementsByClassName('controls')[0].getElementsByClassName('title')[0];
const mediaPlayerControlBtns = mediaPlayer.getElementsByClassName('controls')[0].getElementsByClassName('buttons')[0];
const playBtn = mediaPlayerControlBtns.getElementsByClassName('playstate')[0].getElementsByClassName('fa-play')[0];
const pauseBtn = mediaPlayerControlBtns.getElementsByClassName('playstate')[0].getElementsByClassName('fa-pause')[0];
const stopBtn = mediaPlayerControlBtns.getElementsByClassName('stop')[0];
const nextBtn = mediaPlayerControlBtns.getElementsByClassName('next')[0];
const backBtn = mediaPlayerControlBtns.getElementsByClassName('back')[0];

function playCurrentTrack() {
	if (mediaPlayer.classList.contains('play')) {
	  mediaPlayer.classList.toggle('play');
	}
	player.play();
	mediaPlayer.classList.toggle('play');
}

function pauseCurrentTrack() {
	player.pause();
	mediaPlayer.classList.toggle('play');
}

function stopCurrentTrack() {
	if (mediaPlayer.classList.contains('play')) {
	  player.pause();
	  player.currentTime = 0;
	  mediaPlayer.classList.toggle('play');
	}
}

function playSelectedTrack(selectedTrackNum) {
	player.src = trackList[selectedTrackNum].src;
	playCurrentTrack();
	mediaPlayerControlTitlePanel.title = trackList[selectedTrackNum].title;
}

function flipOnNextTrack() {
	let nextTrackNum = currentTrackNum + 1;
	nextTrackNum = (currentTrackNum !== lastTrackNum) ? nextTrackNum : 0;
	playSelectedTrack(nextTrackNum);
	currentTrackNum = nextTrackNum;
}

function flipOnBackTrack() {
	let backTrackNum = currentTrackNum - 1;
	backTrackNum = (currentTrackNum !== 0) ? backTrackNum : lastTrackNum;
	playSelectedTrack(backTrackNum);
	currentTrackNum = backTrackNum;
}


playBtn.onclick = playCurrentTrack;
pauseBtn.onclick = pauseCurrentTrack;
stopBtn.onclick = stopCurrentTrack;
nextBtn.onclick = flipOnNextTrack;
backBtn.onclick = flipOnBackTrack;