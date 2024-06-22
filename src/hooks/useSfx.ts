import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import music from "../assets/music.mp3";
import click from "../assets/click.mp3";
import win from "../assets/win.mp3";
import draw from "../assets/draw.mp3";
import { SFXMethods } from "../models/interface";
import { SFXState } from "../models/types";
import { APP_ID } from "../utils/constants";

export const useSfx = create<SFXState & SFXMethods>()(
  devtools(
    persist(
      (set, get) => ({
        musicSound: new Audio(music),
        clickSound: new Audio(click),
        winSound: new Audio(win),
        drawSound: new Audio(draw),

        playGameMusicSound: () => {
          const { musicSound } = get();
          musicSound.autoplay = true;
          musicSound.volume = 0.5;
          musicSound.preload = "auto";
          musicSound.loop = true;
          musicSound.play();
        },
        pauseGameSoundMusic: () => {
          const { musicSound } = get();
          musicSound.pause();
        },
        clickBoardSound: () => {
          const { clickSound } = get();
          clickSound.play();
        },
        winGameSound: () => {
          const { winSound } = get();
          winSound.play();
        },
        drawGameSound: () => {
          const { drawSound } = get();
          drawSound.play();
        },
      }),
      {
        name: `${APP_ID}.tic-tac-toe:sfx`,
      }
    )
  )
);
