import React, { useEffect, useState } from 'react'
import { server } from '../index'
import axios from 'axios'
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react'
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from './ErrorComponent';


const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await axios.get(`${server}/api/v3/exchanges`);
        setLoader(false);
        setExchanges(data);
      } catch (error) {
        setLoader(false)
        setError(true)
      }

    }
    getData();
  }, []);

  if (error) return <ErrorComponent msg={'Error While Fetching Exchanges'} />;

  return (
    <>
      <Container maxW={'container.xl'}>
        {
          loader ? <ScaleLoader
            color={'black'}
            loading={loader}
            cssOverride={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> :
            <HStack wrap={'wrap'} justifyContent={'center'}>
              {exchanges.map((e) => (
                <ExchangeCard
                  key={e.id}
                  name={e.name}
                  img={e.image}
                  rank={e.trust_score_rank}
                  url={e.url}
                />
              ))}

            </HStack>
        }

      </Container>
    </>
  )
}

const ExchangeCard = ({ name, url, img, rank }) => (
  <a href={url} target={'blank'}>
    <VStack w={'52'} shadow={'lg'} padding={'8'} borderRadius={"lg"} m={'4'} transition={'all 0.2s'} css={{
      '&:hover': {
        transform: 'scale(1.1)',
      }
    }}>
      <Image
        src={img}
        h={'10'}
        w={'10'}
        alt={'exchange'}
      />
      <Heading size='md'>{rank}</Heading>
      <Text>{name}</Text>

    </VStack>
  </a>
)

export default Exchanges
