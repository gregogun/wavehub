import { SongInfo } from '@/types';
import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { playerReducer } from '../reducer';
import { PlayerState } from '../types';

const initialState: PlayerState = {
  currentTrack: 0,
  currentTrackId: null,
  audioRef: null,
  trackList: [],
  repeat: false,
  shuffle: false,
  playing: false,
};

export const PlayerContext = createContext<{
  currentTrack: number;
  currentTrackId: string;
  audioRef: any;
  playing: boolean;
  repeat: boolean;
  shuffle: boolean;
  trackList: SongInfo[];
  setCurrentTrack?: (index: number) => void;
  setCurrentTrackId?: (id: string) => void;
  setTracklist?: (tracklist: SongInfo[]) => void;
  togglePlaying?: (playing?: boolean) => void;
  prevTrack?: () => void;
  nextTrack?: (index?: number) => void;
  handleTrackEnd?: () => void;
}>({
  currentTrack: 0,
  currentTrackId: null,
  audioRef: null,
  playing: false,
  repeat: false,
  shuffle: false,
  trackList: [],
});

interface PlayerProviderProps {
  children: React.ReactNode;
}

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const audioRef = useRef(null);
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const setCurrentTrack = (index: number) => dispatch({ type: 'SET_CURRENT_SONG', data: index });

  const setCurrentTrackId = (id: string) => dispatch({ type: 'SET_CURRENT_SONG_ID', data: id });

  const setTracklist = (tracklist: SongInfo[]) =>
    dispatch({ type: 'SET_SONGS_ARRAY', data: tracklist });

  const togglePlaying = (playing?: boolean) => {
    if (playing) {
      dispatch({ type: 'PLAYING', data: playing });
    } else {
      dispatch({ type: 'PLAYING', data: !state.playing });
    }
  };

  const prevTrack = () => {
    if (state.currentTrack == 0) {
      setCurrentTrack(state.trackList.length - 1);
    } else {
      setCurrentTrack(state.currentTrack - 1);
    }
  };

  const nextTrack = (index?: number) => {
    if (index) {
      return dispatch({
        type: 'SET_CURRENT_SONG',
        data: index,
      });
    }
    if (state.currentTrack == state.trackList.length - 1) {
      setCurrentTrack(0);
    } else {
      setCurrentTrack(state.currentTrack + 1);
    }
  };

  const handleTrackEnd = () => {
    if (state.shuffle) {
      return dispatch({
        type: 'SET_CURRENT_SONG',
        data: Math.floor(Math.random() * state.trackList.length),
      });
    } else {
      if (state.repeat) {
        nextTrack(state.currentTrack);
      } else if (state.currentTrack === state.trackList.length - 1) {
        return;
      } else {
        nextTrack();
      }
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack: state.currentTrack,
        currentTrackId: state.currentTrackId,
        audioRef,
        playing: state.playing,
        repeat: state.repeat,
        shuffle: state.shuffle,
        trackList: state.trackList,
        setCurrentTrack,
        setCurrentTrackId,
        setTracklist,
        prevTrack,
        nextTrack,
        togglePlaying,
        handleTrackEnd,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = () => useContext(PlayerContext);

export { PlayerProvider, usePlayer };
