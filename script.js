// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Get all song links from index.html
    const songLinks = document.querySelectorAll(".rec_songs a");

    // Add click event listener to each song
    if (songLinks.length > 0) {
        const songs = Array.from(songLinks).map((link, index) => {
            const songDiv = link.querySelector("div");
            return {
                index,
                imgSrc: songDiv.querySelector(".imagediv img").src,
                audioSrc: songDiv.querySelector("audio source").src,
            };
        });

        // Save the song list to localStorage
        localStorage.setItem("songs", JSON.stringify(songs));

        songLinks.forEach((link, index) => {
            link.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent default anchor behavior

                // Save current song data to localStorage
                localStorage.setItem("currentSongIndex", index);
                localStorage.setItem("selectedSongImage", songs[index].imgSrc);
                localStorage.setItem("selectedAudio", songs[index].audioSrc);

                // Redirect to playing.html
                window.location.href = link.href;
            });
        });
    }

    
});
