import { useState, useEffect, useRef, useCallback } from 'react';

export const useAudioPlayer = () => {
  const [duration, setDuration] = useState<number>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState<number>();
  const [currentVolume, setCurrentVolume] = useState<number>(1);
  const [updatedVolume, setUpdatedVolume] = useState<number>();
  const [trackProgress, setTrackProgress] = useState<number>();
  const audioRef = useRef(null);
  const audio: HTMLAudioElement = audioRef?.current;

  useEffect(() => {
    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio?.duration);
    };

    const setAudioTime = () => setCurrentTime(audio?.currentTime);

    // DOM listeners: update React state on DOM events
    audio?.addEventListener('loadeddata', () => setDuration(audio?.duration));

    audio?.addEventListener('timeupdate', () => setCurrentTime(audio?.currentTime));

    audio?.addEventListener('volumechange', () => setCurrentVolume(audio?.volume));

    // console.log(currentVolume);

    // React state listeners: update DOM on React state changes
    playing ? audio?.play() : audio?.pause();

    // if (clickedTime && clickedTime !== currentTime) {
    //   audio.currentTime = clickedTime;
    //   setClickedTime(null);
    // }

    if (updatedVolume && updatedVolume !== currentVolume) {
      if (updatedVolume < 0.05) {
        audio.volume = 0;
        return;
      }
      audio.volume = updatedVolume;
      setUpdatedVolume(null);
    }

    // effect cleanup
    return () => {
      audio?.removeEventListener('loadeddata', setAudioData);
      audio?.removeEventListener('timeupdate', setAudioTime);
    };
  }, [updatedVolume, clickedTime, playing, duration]);

  useEffect(() => {
    if (trackProgress && trackProgress !== currentTime) {
      audio.currentTime = currentTime;
      setTrackProgress(null);
    }
  }, [currentTime]);

  return {
    currentTime,
    duration,
    playing,
    currentVolume,
    trackProgress,
    setPlaying,
    setClickedTime,
    setCurrentTime,
    setUpdatedVolume,
    setTrackProgress,
    audioRef,
    audio,
  };
};
