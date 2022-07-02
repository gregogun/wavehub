import { SongInfo } from '@/types';

type PlayerActionType =
  | 'SET_SONGS_ARRAY'
  | 'SET_CURRENT_SONG'
  | 'SET_CURRENT_SONG_ID'
  | 'SHUFFLE'
  | 'REPEAT'
  | 'PLAYING';

//Player
export interface PlayerAction {
  type: PlayerActionType;
  data: any;
}

export interface PlayerState {
  currentTrack: number;
  currentTrackId: string;
  trackList: SongInfo[];
  shuffle: boolean;
  repeat: boolean;
  playing: boolean;
}
