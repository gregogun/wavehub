import { PlayerAction, PlayerState } from '@/modules/player/types';

export const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case 'SET_SONGS_ARRAY':
      return {
        ...state,
        trackList: action.data,
      };
    case 'SET_CURRENT_SONG':
      return {
        ...state,
        currentTrack: action.data,
        playing: true,
      };
    case 'SET_CURRENT_SONG_ID':
      return {
        ...state,
        currentTrackId: action.data,
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
