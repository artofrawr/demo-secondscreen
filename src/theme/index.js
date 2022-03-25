import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        fontFamily: 'Roboto, sans-serif',
        color: 'black',
      },
    },
  },
})

export default theme
