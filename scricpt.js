console.log("javaScript implementations is here");
let currentSong = new Audio();

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getsongs (){
let a = await fetch("http://127.0.0.1:3000/SPORTIFY%20CLONE/songs/")
let response = await a.text();
// we used all this to get the songs 
// return response

let div = document.createElement("div")
div.innerHTML = response;
let as = div.getElementsByTagName("a") 
// console.log(as);
let songs = []
for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")){
        
            songs.push(element.href.split("/songs/")[1]);
    }
}
return songs

}
  // // play the first song like this 
    // var audio = new Audio(songs[0]);
    // // audio.play();
const playMusic = (track,pause=false) => {
    // let audio = new Audio("/SPORTIFY CLONE/songs/" + track );
    currentSong.src = "/SPORTIFY CLONE/songs/" + track ;
    if (!pause){
        currentSong.play()
        play.src = "pause.svg"
    }
   
   document.querySelector(".songinfo").innerHTML = track ;
   document.querySelector(".songtime").innerHTML = " 00:00 / 00:00 "
}


async function main (){


    //get the list of the first song
    let songs =  await getsongs()
   playMusic(songs[0],true)

//SHAOW ALL THE SONGS IN THE PLAYLIST
    let songUL = document.querySelector(".songslist").getElementsByTagName("ul")[0]
   //song dalne k liye hia ye ul ke ander 
   for (const song of songs) {
       songUL.innerHTML = songUL.innerHTML + `<li> 
       <img class="invert" src="music.svg" alt="">
       <div class="info_ofsong">
           <div>${song.replaceAll("%20"," ")}</div>
           <div>Ayaan</div>
       </div>
       <div class="playnow">
           <span>PlayNow</span>
           <img class="invert" src="play2.svg" alt="">
       </div>
       </li>`;
   }

//    Attach an eventlistner to each song


  Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
    console.log(e.querySelector(".info_ofsong").firstElementChild.innerHTML.trim());
    playMusic(e.querySelector(".info_ofsong").firstElementChild.innerHTML.trim());
    })
  });

//    Attach an eventlistner to each next and previous songs 
play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play()
        play.src = "pause.svg"
    }
    else {
        currentSong.pause()
        play.src = "play.svg"
    }
})

// listen for timeupdate event 
currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
})
//add an event listner to seekbar
document.querySelector(".seekbar").addEventListener("click",(e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width)*100;
  document.querySelector(".circle").style.left = ( percent + "%") ;
  currentSong.currentTime = ((currentSong.duration)*percent)/100
}


)

}
main()
