import { Text } from '@chakra-ui/react'

const Credits = () => (
  <Text
    fontSize="16px"
    py="50px"
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
    <a href="https://youtu.be/kLZJ-0IP9bY" target="_blank" rel="noreferrer">
      Video
    </a>
    by
    <a href="http://www.knowermusic.com/" target="_blank" rel="noreferrer">
      Knower
    </a>
  </Text>
)

export default Credits
