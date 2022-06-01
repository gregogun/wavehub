import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';

export async function addFunds(arweave: Arweave, walletAddress: string) {
  await arweave.api.get(`/mint/${walletAddress}/1000000000000000`);
}

export async function mineBlock(arweave: Arweave) {
  await arweave.api.get('mine');
}
