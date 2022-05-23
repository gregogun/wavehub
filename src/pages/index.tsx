import { arweave } from '@/lib/api';
import { Box } from '@/ui/Box';
import { Button } from '@/ui/Button';
import { Flex } from '@/ui/Flex';
import { Heading } from '@/ui/Heading';
import { Input } from '@/ui/Input';
import { JWKInterface } from 'arweave/node/lib/wallet';
import type { NextPage } from 'next';
import { useState } from 'react';
import Bundlr from '@bundlr-network/client';
import { Container } from '@/ui/Container';
import { AppHeader } from '@/modules/layout/AppHeader';

const Home: NextPage = () => {
  const [wallet, setWallet] = useState<JWKInterface>();
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [songName, setSongName] = useState();
  const [transactionId, setTransactionId] = useState<string>();

  const generateWallet = async () => {
    const key = await arweave.wallets.generate();
    const address = await arweave.wallets.jwkToAddress(key);
    setWallet(key);
    setWalletAddress(address);
    console.log(address);
  };

  const mintTokens = async (address: string) => {
    console.log('same address?:', address);
    await arweave.api.get('mint/' + address + '/1000000000000');
    await arweave.wallets.getBalance(address).then((balance) => {
      const ar = arweave.ar.winstonToAr(balance);
      console.log('you have', Number(ar).toFixed(0), 'AR');
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(songName);

      let transaction = await arweave.createTransaction(
        {
          data: songName,
        },
        wallet
      );

      transaction.addTag('Content-Type', 'text/plain');
      transaction.addTag('Song-Name', songName);

      await arweave.transactions.sign(transaction, wallet);

      let uploader = await arweave.transactions.getUploader(transaction);

      while (!uploader.isComplete) {
        await uploader.uploadChunk();
        console.log(
          `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
        );
      }

      setTransactionId(transaction.id);

      console.log(transaction);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleChange = async (e) => {
    setSongName(e.target.value);
  };

  const checkTransactionStatus = (txId: string) => {
    arweave.transactions
      .getStatus(txId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTransaction = (txId: string) => {
    let transaction = arweave.transactions
      .getData(txId, { decode: true, string: true })
      .then((transaction) => {
        console.log(transaction);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container css={{ p: '$8' }}>
        <Heading css={{ textAlign: 'center' }}>Welcome to wavehub</Heading>
      </Container>
    </>
  );
};

export default Home;
