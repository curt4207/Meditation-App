// 

// creat a arrow function called app
const app = () =>{
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline =document.querySelector(".moving-outline circle");
    const trackOutline = document.querySelector(".track-outline");
    const video = document.querySelector(".video-container video");

    //Sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    
    //Time Display
    const time = document.querySelectorAll(".time-selection button");
    const timeDisplay= document.querySelector(".time-display");

    //Get the length of time the outline animation has left.
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    
    // default Duration, animates the stroke of the outlineLength.
    let defaultDuration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    
    // Pick different songs
    sounds.forEach(sound =>{
        sound.addEventListener("click", function(){
           song.src = this.getAttribute("data-sound");
           video.src = this.getAttribute("data-video");
           checkPlaying(song);
        });
    })

    //play sound
    play.addEventListener("click", () =>{
        checkPlaying(song);
    })

    //Time duration selection
    time.forEach(option =>{
        option.addEventListener("click", function(){
            defaultDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(defaultDuration / 60)}:${Math.floor(defaultDuration % 60)}`
        })
    });

    //Creat a function to Start and Stop the song
   const checkPlaying = song => {
    if(song.paused){
        song.play();
        video.play();
        play.src ="./svg/pause.svg";
    }else{
        song.pause();
        video.pause();
        play.src ="./svg/play.svg";
        }
   }
   //Circle animated
   song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = defaultDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);/* resets back to 0 when it hits 60*/
        let minutes = Math.floor(elapsed / 60);/*60/60= 1min */

        let progress = outlineLength - (currentTime/ defaultDuration) * outlineLength;
        outline.style.strokeDashoffset =progress;
        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= defaultDuration){
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src ="./svg/play.svg";
        }
   } 

};

app();