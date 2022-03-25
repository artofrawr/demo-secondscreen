import { Box, Text } from '@chakra-ui/react'
import { string, bool } from 'prop-types'

const Instructions = ({ handshake, id }) => (
  <Box pt="50px">
    {!handshake && (
      <>
        <Text
          display="block"
          width="100%"
          textAlign="center"
          sx={{
            '& > a': {
              color: '#0068B7',
              px: '5px',
            },
            '& > a:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Now open
          <a
            href="https://demo-secondscreen.artofrawr.com/mobile"
            target="_blank"
            rel="noreferrer"
          >
            https://demo-secondscreen.artofrawr.com/mobile
          </a>
          on your secondary device.
        </Text>
        <Text
          pt="30px"
          pb="15px"
          display="block"
          width="100%"
          textAlign="center"
        >
          When asked for it, use this unique id to connect:
        </Text>
        <Text
          fontSize="34px"
          fontWeight={700}
          display="block"
          textAlign="center"
        >
          {id}
        </Text>
      </>
    )}
    {handshake && <Text>You&apos;re connected!</Text>}
  </Box>
)

Instructions.propTypes = {
  handshake: bool,
  id: string,
}

Instructions.defaultProps = {
  handshake: false,
  id: '',
}

export default Instructions
