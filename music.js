//These arrays generate the song selection section. The format is [[AlbumTitle1,[SongName1,SongPath1],[SongName2,SongPath2]],[AlbumTitle2,[SongName3,SongPath3]]]

var currentlyPlaying = '';
var sList = [];

function albumGen(albumList){
    for(var i = 0; i < albumList.length; i++) { 
        current_title = albumList[i][0];
        current_song_list = albumList[i].slice(1);
        new Album(current_title, current_song_list);
    }
}
    
class Album {
    constructor(title, songList){
        console.log("TITLE")
        console.log(title)
        console.log("SONGLIST")
        console.log(songList)
        this.title = title;
        this.songList = songList;
        this.div = document.createElement("DIV");
        this.div.setAttribute('id',this.title);
        
        document.getElementById('songs').appendChild(this.div);
        var aTitle = document.createElement("P");
        aTitle.setAttribute('class','albumTitle');
        aTitle.innerHTML = this.title; 
        this.div.appendChild(aTitle);

        for(var i = 0; i < songList.length; i++) { 
            var currentSong = songList[i]
            var currentTitle = currentSong[0];
            var currentPath = currentSong[1];
            let song = new Song(currentTitle, currentPath, this);
            sList.push(song)
        }

    }
}

class Song {
    constructor(title, path, album){
        this.title = title;
        this.album = album;
        this.path = path;
        this.audio;
        this.create_audio_divs();
        this.create_button(); 

    }

    create_button(){
        this.button = document.createElement("DIV");
        this.button.innerHTML = this.title;
        this.button.setAttribute('class','songMouseOver');
        var this_song = this;
        this.button.onclick = function(){
            this_song.play(); 
        }
        this.album.div.appendChild(this.button);
    }

    create_audio_divs(){
        this.div = document.createElement("DIV");
        document.getElementById('player').appendChild(this.div);
        this.div.style.display = 'none';
        
        this.audio = document.createElement("AUDIO");
        this.audio.src = this.path;
        this.div.appendChild(this.audio);
        
        this.audio.addEventListener("ended", () => {
             playNext();
        });

    }

    play(){
        pauseAll();
        var this_song = this; 
        this.audio.play();
        document.getElementById("songName").innerHTML=(this.title);
        currentlyPlaying = this; 
        trackingBar(this);
        document.getElementById('audioplayer').style.display="block";
    }

    pause(){
      this.audio.pause();
      pButton.className = "pause";
    }
    reset(){
      this.audio.pause();
      this.audio.currentTime=0;
      pButton.className = "pause";
    }
}

function playNext(){
    pauseAll()
    nextIndex = sList.indexOf(currentlyPlaying)+1;
    if (nextIndex == sList.length) {
        nextIndex = 0;
    }
    sList[nextIndex].play();
}
    
function createAllAudio(songs,album) {
    var count = songs.length;
    for(var i = 0; i < count; i++) { 
        var currentSong = songs[i];
        createAudio(currentSong,album);
    }
}

function pauseAll() {
    for(var i = 1; i < sList.length; i++) { 
      sList[i].reset();
    }  
}

function hideAll(exception) {
    for (var i = 0; i < sList.length; i++) {
        sList[i].div.style.display="none";
    exception.div.style.display="block";   
    }
}

function playerClick(song) {
    currentSong = song
	if (song.audio.paused) {
        console.log("PAUSED")
		song.audio.play();
		pButton.className = "";
		pButton.className = "pause";
	} 
    else {
		song.pause();
		pButton.className = "";
		pButton.className = "play";
	}
}
 
function trackingBar(song){
    pBut = document.getElementById('pButton');
    pBut.onclick = function(){
        playerClick(song);
    }
    var music = song.audio;
    var duration = music.duration;
    music.addEventListener("timeupdate", timeUpdate, false); 

function timeUpdate() {
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    if (music.currentTime == duration) {
        pButton.className = "";
        pButton.className = "play";
    }
}

// Gets audio file duration
    
//Makes timeline clickable
timeline.addEventListener("click", function (event) {
	moveplayhead(event);
	music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(event) {
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    return (event.clientX - getPosition(timeline)) / timelineWidth;

}
    
// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

function moveplayhead(event) {
    var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
    var newMargLeft = event.clientX - getPosition(timeline);

	if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
		playhead.style.marginLeft = newMargLeft + "px";
	}
	if (newMargLeft < 0) {
		playhead.style.marginLeft = "0px";
	}
	if (newMargLeft > timelineWidth) {
		playhead.style.marginLeft = timelineWidth + "px";
	}
    
}}

// getPosition
// Returns elements left position relative to top-left of viewport
    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }
