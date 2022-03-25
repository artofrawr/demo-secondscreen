import { node, oneOfType, shape, func, object } from 'prop-types'
import { Box, ChakraProvider } from '@chakra-ui/react'
import theme from 'theme'
import GlobalStyles from 'theme/global'
import Footer from 'components/nav/Footer'

const App = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <GlobalStyles />
    <Box
      width="100%"
      maxWidth="800px"
      mx="auto"
      display="flex"
      alignItems="center"
      flexDirection="column"
      pb="100px"
    >
      <Component {...pageProps} />
    </Box>
    <Footer />
  </ChakraProvider>
)

App.propTypes = {
  Component: oneOfType([func, object, node]).isRequired,
  pageProps: shape({}),
}

App.defaultProps = {
  pageProps: {},
}

export default App
