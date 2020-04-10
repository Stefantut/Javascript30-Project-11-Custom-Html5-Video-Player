// Get the elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");

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

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

let isFullscreen = false;

/* View in fullscreen */
function openFullscreen() {
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.mozRequestFullScreen) {
    /* Firefox */
    player.mozRequestFullScreen();
  } else if (player.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) {
    /* IE/Edge */
    player.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
}

// Hook up the Event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

fullscreen.addEventListener("click", () => {
  isFullscreen = !isFullscreen;
  isFullscreen ? openFullscreen() : closeFullscreen();
});
