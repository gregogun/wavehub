import { SongInfo } from '@/types';
import { createContext, useContext, useReducer, useState } from 'react';
import { playerReducer } from '../reducer';
import { PlayerState } from '../types';

const initialState: PlayerState = {
  currentTrack: 0,
  trackList: [],
  repeat: false,
  shuffle: false,
  playing: false,
};

export const PlayerContext = createContext<{
  currentTrack: number;
  playing: boolean;
  repeat: boolean;
  shuffle: boolean;
  trackList: SongInfo[];
  setCurrentTrack?: (index: number) => void;
  setTracklist?: (tracklist: SongInfo[]) => void;
  togglePlaying?: () => void;
  prevTrack?: () => void;
  nextTrack?: (index?: number) => void;
  handleTrackEnd?: () => void;
}>({
  currentTrack: 0,
  playing: false,
  repeat: false,
  shuffle: false,
  trackList: [],
});

interface PlayerProviderProps {
  children: React.ReactNode;
}

const PlayerProvider = ({ children }: PlayerProviderProps) => {
  //   const [state, setState] = useState<PlayerState>();
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const setCurrentTrack = (index: number) => dispatch({ type: 'SET_CURRENT_SONG', data: index });

  const setTracklist = (tracklist: SongInfo[]) =>
    dispatch({ type: 'SET_SONGS_ARRAY', data: tracklist });

  const togglePlaying = () => dispatch({ type: 'PLAYING', data: !state.playing });

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
        playing: state.playing,
        repeat: state.repeat,
        shuffle: state.shuffle,
        trackList: state.trackList,
        setCurrentTrack,
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
