import { Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import FooterButton from './FooterButton'

const Footer = () => {
  const router = useRouter()

  return (
    <Box
      position="fixed"
      bottom="0"
      width="100%"
      height="80px"
      bg="white"
      zIndex="9001"
      lineHeight="80px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="20px"
    >
      <Text as="h1" fontWeight={500} fontSize="16px">
        A second screen demo, implemented with Next.js and socket.io.
      </Text>
      <Box display="flex" flexDirection="row">
        {router.route !== '/' && (
          <FooterButton href="/" mr="15px">
            Home
          </FooterButton>
        )}
        <FooterButton
          href="https://github.com/artofrawr/demo-secondscreen"
          target="_blank"
          rel="noreferrer"
        >
          Source on GitHub
        </FooterButton>
      </Box>
    </Box>
  )
}
export default Footer
