import { PlayerAction, PlayerState } from '@/modules/player/types';

export const playerReducer = (state: PlayerState, action: PlayerAction) => {
  switch (action.type) {
    case 'SET_SONGS_ARRAY':
      return {
        ...state,
        trackList: action.data,
      };
    case 'SET_CURRENT_SONG':
      return {
        ...state,
        currentSong: action.data,
        playing: true,
      };
    case 'SHUFFLE':
      return {
        ...state,
        shuffle: action.data,
      };
    case 'REPEAT':
      return {
        ...state,
        repeat: action.data,
      };
    case 'PLAYING':
      return {
        ...state,
        playing: action.data,
      };

    default:
      break;
  }
};
