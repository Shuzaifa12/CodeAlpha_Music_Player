// If on playing.html, load song data
if (window.location.pathname.includes("playing.html")) {
    const imageElement = document.querySelector(".middle img");
    const audioElement = new Audio();
    const playPauseButton = document.querySelector("button[onclick='playpause()']");
    const progressBar = document.querySelector("#progress");
    const forwardButton = document.querySelector(".button_div button:nth-child(3)");
    const backwardButton = document.querySelector(".button_div button:nth-child(1)");

    // Retrieve data from localStorage
    const imgSrc = localStorage.getItem("selectedSongImage");
    const audioSrc = localStorage.getItem("selectedAudio");
    const songs = JSON.parse(localStorage.getItem("songs"));
    let currentSongIndex = parseInt(localStorage.getItem("currentSongIndex"), 10);

    // Update display image and audio source
    if (imgSrc && audioSrc) {
        imageElement.src = imgSrc;
        audioElement.src = audioSrc;
        audioElement.play(); // Start playing the song
    }

    // Play/Pause functionality
    playPauseButton.addEventListener("click", () => {
        if (audioElement.paused) {
            audioElement.play();
            document.querySelector("#ctrlicon").src = "/assets/pause.png"; // Change icon to pause
        } else {
            audioElement.pause();
            document.querySelector("#ctrlicon").src = "/assets/play.png"; // Change icon to play
        }
    });

    // Update progress bar as song plays
    audioElement.addEventListener("timeupdate", () => {
        progressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
    });

    // Seek functionality
    progressBar.addEventListener("input", () => {
        audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
    });

    // Forward and Backward buttons
    forwardButton.addEventListener("click", () => {
        changeSong(currentSongIndex + 1);
    });

    backwardButton.addEventListener("click", () => {
        changeSong(currentSongIndex - 1);
    });

    function changeSong(newIndex) {
        if (newIndex >= 0 && newIndex < songs.length) {
            const newSong = songs[newIndex];

            // Update localStorage
            localStorage.setItem("currentSongIndex", newIndex);
            localStorage.setItem("selectedSongImage", newSong.imgSrc);
            localStorage.setItem("selectedAudio", newSong.audioSrc);

            // Update UI and play new song
            imageElement.src = newSong.imgSrc;
            audioElement.src = newSong.audioSrc;
            audioElement.play();

            // Update the current index
            currentSongIndex = newIndex;
        }
    }
}