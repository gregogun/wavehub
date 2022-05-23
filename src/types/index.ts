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
