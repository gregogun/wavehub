import { SongInfo } from '@/types';

type PlayerActionType = 'SET_SONGS_ARRAY' | 'SET_CURRENT_SONG' | 'SHUFFLE' | 'REPEAT' | 'PLAYING';

//Player
export interface PlayerAction {
  type: PlayerActionType;
  data: any;
}

export interface PlayerState {
  currentTrack: number;
  trackList: SongInfo[];
  shuffle: boolean;
  repeat: boolean;
  playing: boolean;
}
