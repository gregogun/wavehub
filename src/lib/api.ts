import Arweave from 'arweave';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import ArweaveAccount from 'arweave-account';
import { Account, SongInfo } from '@/types';

export const arweave = Arweave.init({
  host: 'localhost',
  port: 1984,
  protocol: 'http',
});

export const webWallet = new ArweaveWebWallet({
  name: 'wavehub',
  logo: `${typeof window !== 'undefined' && window.location.origin}/img/logo_text.svg`,
});

export const connect = () => {
  webWallet.setUrl('https://arweave.app');
  return webWallet.connect();
};

export const account = new ArweaveAccount();

export const getAccount = async (address: string) => {
  try {
    const acc: Account = await account.get(address);
    if (acc) {
      return acc;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAccountHandle = async (handle: string) => {
  console.log(handle);
  return await account.search(handle);
};

interface Tag {
  name: string;
  value: string;
}

interface Node {
  id: string;
  owner: { address: string };
  data: { size: string; type?: string };
  tags: Tag[];
}

export const createSongInfo = (node: Node /* need to update types */): SongInfo | undefined => {
  const ownerAddress = node.owner?.address;
  // const height = node.block ? node.block.height : -1;
  // const timestamp = node.block ? (node.block.timestamp, 10) * 1000 : -1;
  const audioTag = node.tags.filter((tag) => tag.name === 'Audio-Source');
  const audioTx = audioTag[0].value;

  const coverTag = node.tags.filter((tag) => tag.name === 'Cover-Artwork');
  const coverTx = coverTag[0].value;

  const title = node.tags.filter((tag) => tag.name === 'Title')[0].value;

  const artist = node.tags.filter((tag) => tag.name === 'Artist')[0].value;

  const songInfo: SongInfo = {
    txid: node.id,
    owner: ownerAddress,
    audioTxId: audioTx,
    coverTxId: coverTx,
    title,
    artist,
  };

  return songInfo;
};
