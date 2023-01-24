import { Avatar, Stack, VStack, Text, Box } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <>
      <Box px={'16'} py={'16'} minH={'48'} bg={'blackAlpha.900'}>
        <Stack direction={['column', 'row']} color={'white'}>
          <VStack w={'full'} align={['center', 'flex-start']} justifyContent={'center'}>
            <Text fontWeight={'bold'}>
              About Us
            </Text>
            <Text>
              We are the best crypto trading app in India, we provide our guidance at a very cheap price.
            </Text>
          </VStack>
          <VStack justifyContent={'center'}>
            <Avatar size={'xl'} />
            <Text>Our Founder</Text>
          </VStack>
        </Stack>
      </Box>
    </>
  )
}

export default Footer
