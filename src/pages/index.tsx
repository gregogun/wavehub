import { Heading } from '@/ui/Heading';
import type { NextPage } from 'next';
import { Container } from '@/ui/Container';
import arweaveGraphql from 'arweave-graphql';
import { useEffect, useState } from 'react';
import { createSongInfo } from '@/lib/api';
import { SongInfo } from '@/types';
import { Flex } from '@/ui/Flex';
import { SongItem } from '@/modules/discover/songItem';
import { AudioPlayer } from '@/modules/player';
import { usePlayer } from '@/modules/player/context';

const Home: NextPage = () => {
  const { setTracklist, trackList } = usePlayer();
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
      const dataTest = results.transactions.edges.map((edge) => console.log(edge));
      setData(data);
      console.log(dataTest);

      // setTracklist(data);
    } catch (error) {
      throw new Error('Error:', error);
    }
  };

  return (
    <>
      <Container css={{ p: '$8' }}>
        <Flex gap="10" css={{ flexWrap: 'wrap', p: '$5' }}>
          {data?.map((songData) => (
            <SongItem
              tracklist={data}
              setTracklist={setTracklist}
              key={songData.txid}
              id={songData.txid}
              artist={songData.artist}
              title={songData.title}
              audioTxId={songData.audioTxId}
              coverTxId={songData.coverTxId}
              owner={songData.owner}
            />
          ))}
        </Flex>
        <AudioPlayer trackList={trackList} />
      </Container>
    </>
  );
};

export default Home;
