import music from "../assets/music.mp3";
import click from "../assets/click.mp3";
import win from "../assets/win.mp3";
import draw from "../assets/draw.mp3";

export const musicSound = new Audio(music);
const clickSound = new Audio(click);
const winSound = new Audio(win);
const drawSound = new Audio(draw);

export const gameMusicSound = () => {
  musicSound.autoplay = true;
  musicSound.volume = 0.5;
  musicSound.preload = "auto";
  musicSound.play();
};
export const muteOrUnmuteGameSounds = (mute: boolean) => {
  musicSound.muted = mute;
  clickSound.muted = mute;
  winSound.muted = mute;
  drawSound.muted = mute;
};
export const clickBoardSound = () => clickSound.play();
export const winGameSound = () => winSound.play();
export const drawGameSound = () => drawSound.play();
