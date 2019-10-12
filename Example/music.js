//These arrays generate the song selection section. The format is [[AlbumTitle1,[SongName1,SongPath1],[SongName2,SongPath2]],[AlbumTitle2,[SongName3,SongPath3]]]

var albumList = [
                ['Volume V: Peter The Dolphin',


                 ['Polymorph Self','SzaszVol5/PolymorphSelf.mp3'],
                 ['Quilt Song','SzaszVol5/QuiltSong.mp3'],
                 ['Midas Song','SzaszVol5/MidasSong.mp3'],
                 ['Swedish Dogs','SzaszVol5/SwedishDogs.mp3'],
                ['Another Mortise Song','SzaszVol5/AnotherMortiseSong.mp3'],
                 ['Abstract Shapes','SzaszVol5/AbstractShapes.mp3'],
                ['Naming Things','SzaszVol5/NamingThings.mp3']
                 
                 ],
    
                [ 'Volume II: Coprolith',
                 ['Clock Strikes Three', '/music/SzaszVol2/ClockStrikesThree.mp3'],
                 ['Grecian', '/music/SzaszVol2/Grecian.mp3'],
                 ['Trainfucker', '/music/SzaszVol2/Trainfucker.mp3'],
                ['Cell', "/music/SzaszVol2/Cell.mp3"]],

        
                ['Volume I: Eidos',
                ['Kids in Sweden',"/music/SzaszVol1/01KidsinSweden.mp3"],
                ['Shroud of Turin',"/music/SzaszVol1/02ShroudofTurin.mp3"],
                ['Japanese Professional Wrestler',"/music/SzaszVol1/03JapaneseProfessionalWrestler.mp3"],
                ['Georgetown',"/music/SzaszVol1/04Georgetown.mp3"]]
                ];

var pathList = [];
var currentlyPlaying = '';
    

function changeText(target,newText) {
    document.getElementById(target).innerHTML=newText;

}
    
function createAudio(songList,albumName) {
    songName = songList[0];
    songPath = songList[1];
    audDivName = "aud"+String(songName);
    butDivName = "but"+String(songName);
    
    var div = document.createElement("DIV");
    document.getElementById('player').appendChild(div);
    div.setAttribute('id',String(songPath));
    div.style.display = 'none';
    
    var aud = document.createElement("AUDIO");
    aud.setAttribute('id',String(audDivName));
    aud.setAttribute("src", songPath);
    document.getElementById(songPath).appendChild(aud);
    
    var btn = document.createElement("DIV");
    btn.innerHTML = songName;
    btn.setAttribute('id',butDivName);
    btn.setAttribute('class','songMouseOver');
    btn.setAttribute('onclick','pauseAll()'+';playAudio(\"'+String(audDivName)+'\")'+';changeCurrentlyPlaying(\"'+String(songName)+'\")'+';hideAll(\"'+String(songPath)+'\")');
    document.getElementById(albumName).appendChild(btn);
}
    
function changeCurrentlyPlaying (currentPlay){
    document.getElementById("songName").innerHTML=(String(currentPlay));
    cPlay = audDivName = "aud"+String(currentPlay);
    currentlyPlaying = cPlay;
    trackingBar(cPlay);
    document.getElementById('audioplayer').style.display="block";
}

function createAllAudio(songs,album) {
    var count = songs.length;
    for(var i = 1; i < count; i++) { 
        var currentSong = songs[i];
        createAudio(currentSong,album);
    }
}

function albumGen (alList){
    var albumQuantity = alList.length;
    for (var j = 0; j < albumQuantity; j++) {
        currentAlbum = alList[j];
        var alDiv = document.createElement("DIV");
            
        alDiv.setAttribute('id',String(currentAlbum[0]));
        
        document.getElementById('songs').appendChild(alDiv);
            var aTitle = document.createElement("P");
            aTitle.setAttribute('class','albumTitle');
            aTitle.innerHTML = (String(currentAlbum[0]));
            document.getElementById(String(currentAlbum[0])).appendChild(aTitle);
        createAllAudio(currentAlbum,currentAlbum[0]);
    }
}
    
function pauseAll() {
  var sounds = document.getElementsByTagName('audio');
		pButton.className = "";
		pButton.className = "pause";
  for(i=0; i<sounds.length; i++) {
      sounds[i].pause();
      sounds[i].currentTime=0;
  }  
}

function hideAll(exception) {
    var div = document.getElementById('player');
    var divs = div.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display="none";
    document.getElementById(exception).style.display="block";   
    }
}

function playAudio(path) {
var x = document.getElementById(path);
  x.play();
} 
    
function playerClick(audioID) {
    var currentAudio = document.getElementById(String(audioID));
	if (currentAudio.paused) {
		currentAudio.play();
		pButton.className = "";
		pButton.className = "pause";
	} 
    else {
		currentAudio.pause();
		pButton.className = "";
		pButton.className = "play";
	}
}
 
function trackingBar(audioContainer){
    pBut = document.getElementById('pButton');
 pBut.setAttribute('onclick','playerClick(\"'+String(audioContainer)+'\")');
    var duration;
    var music = document.getElementById(String(audioContainer));
    duration = music.duration;
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