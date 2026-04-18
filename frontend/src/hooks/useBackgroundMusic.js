// src/hooks/useBackgroundMusic.js

import { useRef, useEffect } from "react";

export default function useBackgroundMusic(src, { volume = 0.5, loop = true } = {}) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;
    audioRef.current.loop = loop;

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, [src]);

  const play  = () => audioRef.current?.play();
  const pause = () => audioRef.current?.pause();
  const toggle = () => audioRef.current?.paused ? play() : pause();

  return { play, pause, toggle };
}

