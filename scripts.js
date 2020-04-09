// Get the elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progrssBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll("player__slider");

// Build Functions
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
}
function updateButton() {
  const icon = this.paused ? "►" : "❚❚";
  toggle.textContent = icon;
}

function skip() {
  // used parseFloat to convert string to number
  video.currentTime += parseFloat(this.dataset.skip);
  console.log(video.currentTime);
}
// Hook Event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));
