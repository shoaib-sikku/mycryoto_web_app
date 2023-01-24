import React, { useEffect, useState } from 'react'
import { server } from '../index'
import axios from 'axios'
import { Container, HStack, VStack, Image, Heading, Text, Radio, RadioGroup, Button } from '@chakra-ui/react'
import ScaleLoader from "react-spinners/ScaleLoader";
import ErrorComponent from './ErrorComponent';
import { Link } from 'react-router-dom'

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState('inr');

  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await axios.get(`${server}/api/v3/coins/markets?vs_currency=${country}&page=${page}`);
        setCoins(data);
        setLoader(false);

      } catch (error) {
        setLoader(false)
        setError(true)
      }

    }
    getData();
  }, [country, page]);

  const changePage = (p) => {
    setPage(p);
    setLoader(true)
  }

  let arr = new Array(132).fill(1);

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
            <>
              <RadioGroup value={country} onChange={setCountry} >
                <HStack wrap={'wrap'} >
                  <Radio value='inr'>INR</Radio>
                  <Radio value='usd'>USD</Radio>
                  <Radio value='eur'>EUR</Radio>
                </HStack>
              </RadioGroup>
              <HStack wrap={'wrap'} justifyContent={'center'}>
                {coins.map((e) => (
                  <CoinCard
                    cursym={country === 'inr' ? '₹' : country === 'usd' ? '$' : '€'}
                    key={e.id}
                    name={e.id}
                    price={e.current_price}
                    symbol={e.symbol}
                    img={e.image}
                  />
                ))}
              </HStack>
              <HStack w={"full"} overflowX={"auto"} p={"8"}>
                {arr.map((item, index) => (
                  <Button
                    key={index}
                    bgColor={page === index + 1 ? 'blackAlpha.400' : "blackAlpha.900"}
                    color={"white"}
                    onClick={() => changePage(index + 1)}

                  >
                    {index + 1}
                  </Button>
                ))}
              </HStack>
            </>
        }

      </Container>
    </>
  )
}

const CoinCard = ({ name, symbol, img, price, cursym }) => (
  <Link to={`${name}`}>
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
      <Heading size='md'>{symbol}</Heading>
      <Text>{name}</Text>
      <Text>{cursym}{price}</Text>

    </VStack>
  </Link>
)
export default Coins
