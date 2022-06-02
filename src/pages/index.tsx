import { Heading } from '@/ui/Heading';
import type { NextPage } from 'next';
import { Container } from '@/ui/Container';
import arweaveGraphql from 'arweave-graphql';
import { useEffect, useState } from 'react';
import { createSongInfo } from '@/lib/api';
import { SongInfo } from '@/types';
import { Flex } from '@/ui/Flex';
import { SongItem } from '@/modules/discover/songItem';

const Home: NextPage = () => {
  const [data, setData] = useState<SongInfo[]>();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const results = await arweaveGraphql('http://localhost:1984/graphql').getTransactions({
        tags: [
          { name: 'App-Name', values: ['wavehub'] },
          { name: 'Content-Type', values: ['application/json'] },
        ],
      });
      const data = results.transactions.edges.map((edge) => createSongInfo(edge.node));
      setData(data);
    } catch (error) {
      throw new Error('Error:', error);
    }
  };

  return (
    <>
      <Container css={{ p: '$8' }}>
        <Flex gap="20" css={{ flexWrap: 'wrap', p: '$5' }}>
          {data?.map((data) => (
            <SongItem
              key={data.txid}
              artist={data.artist}
              title={data.title}
              audioTxId={data.audioTxId}
              coverTxId={data.coverTxId}
            />
          ))}
        </Flex>
      </Container>
    </>
  );
};

export default Home;
