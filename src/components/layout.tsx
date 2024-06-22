import React, { useState } from "react";
import { musicSound, muteOrUnmuteGameSounds } from "../utils/sfx";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [gameSounds, setGameSounds] = useState(musicSound.muted === false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <button
        onClick={() => {
          setGameSounds(gameSounds === true ? false : true);
          muteOrUnmuteGameSounds(gameSounds);
        }}
        className="absolute top-5 end-5 text-emerald-500 font-bold"
      >
        {gameSounds === true ? "Mute" : "Unmute"}
      </button>
      {children}
    </div>
  );
};

export default Layout;
