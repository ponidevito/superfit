// video play
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("details-game")) {
    const video = document.getElementById("custom-video");
    const playButton = document.getElementById("play-button");

    if (video && playButton) {
      playButton.addEventListener("click", function () {
        video.setAttribute("controls", "controls");
        video.play();
        playButton.style.display = "none";
      });
    }
  }
});
