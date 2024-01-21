//These arrays generate the song selection section. The format is [[AlbumTitle1,[SongName1,SongPath1],[SongName2,SongPath2]],[AlbumTitle2,[SongName3,SongPath3]]]

var currentlyPlaying = '';
var sList = [];
var band_descriptions = {
"Casca":
`             <br>
                <span> Eric Balison and I formed Casca and recorded Language of Man in San Francisco in 2023. I play guitar, bass, drums, and sing. Eric sings and plays guitar. We both wrote lyrics.</span>
                <br>
                <br>
                <span>Shane Moring and Agnes Widbom contributed lyrics. Agnes and I did backing vocals. Shirin Makaremi recited the poem  بنی‌آدم (Bani Adam) by the poet سعدی شیرازی, (Saadi Shirazi). Anna Rotty provided the photo for the album artwork. The piece is called Judith Slaying Holofernes. You can see more of her work <a href="https://www.annarotty.com/"> here</a>. Thank you so much for your help!</span>
                <br><br>
                <span>Eric's other band is Big Teeth. You can hear their latest recordings, The Babe EP, on bandcamp at this <a href="https://bigteethmusic.bandcamp.com/album/the-babe-ep">link</a></span>
                <br><br><span>You can download the mp3s in a zip file <a href="LanguageOfMan.zip">here</a></span>
                `,
"Szasz":
`             <br>
                <span>Andrew Ware and I formed Szasz in 2012. We recorded Volumes I - IV in quick succession in Encinitas, California. I play guitar, bass, keyboards. Andrew plays drums. We both did vocals and recording.</span>
                <br>
                <br>
                <span>For Volume V I took over drums. It was recorded in San Francisco in 2018.</span>
                <br><br>
                <span>I'm working on the finishing touches on Volume III and IV so they will but up at some point. If you would like digital versions of the recordings email me and I can give you them.</span>
                <br><br>
                <span>Many people have lent us equipment, given us a place to record, or given us technical advice. Special thanks to Diane Baxter, Aaron Dennis, Rene Esteban Franco, Kyle Herbert, John Moring, Mary Jo Preti, Diego Villalobos, Pedro Verdin, and Garth Ware. Also thank you to our biggest fan, Tony Hicks. </span>
`
}

function change_band(caller,band,album_list){
    var band_list = ["szasz_selector", "casca_selector"]
    for (i in band_list){
        document.getElementById(band_list[i]).className = ""
        }
    caller.className= "chosen_selector"
    document.getElementById('songs').innerHTML = ""
    document.getElementById('band_description').innerHTML = band_descriptions[band]
    albumGen(album_list)
}

function albumGen(albumList){
    for(var i = 0; i < albumList.length; i++) { 
        current_title = albumList[i][0];
        current_album_art = albumList[i][1]
        current_song_list = albumList[i].slice(2);
        console.log(current_song_list)
        new Album(current_title, current_song_list, current_album_art);
    }
}
    
class Album {
    constructor(title, songList, current_album_art){
        this.title = title;
        this.songList = songList;
        this.div = document.createElement("DIV");
        this.div.setAttribute('id',this.title);
        this.albumArtPath = current_album_art;
        
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
        document.getElementById('albumArt').src = this.album.albumArtPath
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
    console.log("PAUSE ALL")
    for(var i = 0; i < sList.length; i++) { 
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
