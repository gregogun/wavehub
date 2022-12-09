import { appConfig } from '@/config';
import { SongInfo } from '@/types';

export const testAudioTxId = `1gcMF1b0m-9LxDrX0ro1Zta3nqg2FCfRhqHRMtc33FQ`;

export const testAudioUrl = `https://arweave.net/${testAudioTxId}
`;

export const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const returnedMin = minutes < 10 ? `${minutes}` : `${minutes}`;
  const seconds = Math.floor(secs % 60);
  const returnedSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${returnedMin}:${returnedSec}`;
};

export const getSongIndex = (id: string, tracklist: SongInfo[]) => {
  return tracklist.findIndex((x) => x.txid === id);
};
