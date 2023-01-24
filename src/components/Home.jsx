import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import imgSrc from '../assets/bitcoinTranparent.png';
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Box bg={'blackAlpha.900'} w={'full'} height={'85vh'}>
        <motion.div
          style={{
            height: '80vh',
          }}
          animate={{
            translateY: "20px",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image src={imgSrc} w={'500px'} h={'full'} mx={'auto'} />
        </motion.div>
        <Text color={'white'} textAlign={'center'} fontSize={'2xl'} mt={'-30px'}>MyCrypto</Text>
      </Box>
    </>
  )
}

export default Home
