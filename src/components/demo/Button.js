import { Box } from '@chakra-ui/react'
import { node } from 'prop-types'

const Button = ({ children, ...other }) => (
  <Box
    as="button"
    fontFamily="Roboto, sans-serif"
    border="2px solid black"
    padding="0 20px"
    fontWeight={500}
    fontSize="16px"
    height="44px"
    display="flex"
    alignItems="center"
    bg="black"
    color="white"
    {...other}
    _hover={{
      bg: 'black',
      color: 'white',
    }}
  >
    {children}
  </Box>
)

Button.propTypes = {
  children: node.isRequired,
}

export default Button
