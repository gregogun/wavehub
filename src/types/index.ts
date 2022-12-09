export interface ContractState {
  name: string;
  ticker: string;
  owner: string;
  royalties: {
    [address: string]: number;
  };
  balances: {
    [address: string]: number;
  };
}

export interface ContractAction {
  input: ContractInput;
  caller: string;
}

export interface ContractInput {
  function: ContractFunction;
  ticker: string;
}

export interface ContractResult {
  ticker: string;
  isHolder?: boolean;
}

export type ContractFunction = 'mint' | 'tip' | 'getTicker' | 'isARoyaltyHolder' | 'getRoyalties';

interface ProfileLinks {
  discord?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
}

interface Profile {
  avatar: string;
  addr: string;
  bio: string;
  handle: string;
  links: ProfileLinks;
  name: string;
}

export interface Account {
  profile: Profile;
  txid: string;
}

export interface Verification {
  verified: boolean;
  icon: string;
  percentage: number;
}

export interface SongUploadItems {
  trackName: string;
  artistName: string;
  trackDescription: string;
  audioData: ArrayBuffer;
  coverImageData: ArrayBuffer;
}

export interface SongInfo {
  txid: string;
  owner: string;
  title: string;
  artist: string;
  duration: string;
  audioTxId: string;
  coverTxId: string;
  uploadDate: string;
  error?: string;
}
